import { Button, Checkbox, Input, Modal, Slider, Form, Upload } from 'antd';
import message from '@/components/IMessage';
import { Children, FC, Fragment, ReactNode, cloneElement, isValidElement, useEffect, useState } from 'react';
import './edit-profile-modal.scss';
import { getTokenDetail, getTwitterAccessToken, uploadFile, saveEditInfo, getTwitterClientId } from '@/api/token';
import qs from 'qs';
import { Button as ConnectButton } from '@/components/ui/button';
import { IconTwitter, IconUpload, IconWebsite } from '@/components/icons';
import { Trash } from 'lucide-react';
import { REQUEST_FOLLOWING_STORAGE, UPDATE_PROJECT_TWITTER_STORAGE, EDIT_INFO_STORAGE } from '@/constants';
import { useSearchParams } from 'react-router-dom';
import { authorizeTwitter } from '@/utils';
import { IconCopy } from '@/components/icons';
import { handleCopy } from '@/utils';
import Cropper from 'react-easy-crop';

const FORM_STORAGE_KEY = 'create_token_storage';
const twitterClientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
const twitterRedirectUri = import.meta.env.VITE_TWITTER_FOLLOW_REDIRECT_URI;

const EditProfileModal: FC<{ children: ReactNode; ticker: string; onSaveSuccess: () => void }> = ({
  children,
  ticker,
  onSaveSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [connectTwitterLoading, setConnectTwitterLoading] = useState(false);
  const [twitterAccessToken, setTwitterAccessToken] = useState('');
  const [projectBannerUrl, setProjectBannerUrl] = useState('');
  const [twitter, setTwitter] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [projectDetail, setProjectDetail] = useState({});
  const [searchParams] = useSearchParams();
  const [website, setWebsite] = useState('');
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropLoading, setCropLoading] = useState(false);

  useEffect(() => {
    getTokenDetail(ticker).then((res) => {
      if (res?.data) {
        console.log('TokenDetail: ', res?.data);
        setProjectDetail(res.data);
        setProjectBannerUrl(res.data?.banners ? res.data?.banners[0] : '');
        setTwitter(res.data.twitter);
        setTwitterAccessToken(res.data.twitterAccessToken);
        // get data from local
        let formData = {
          ...res.data,
          banners: res.data?.oldBanners ? res.data?.oldBanners : [],
          tokenIcon: res.data.icon,
          projectDescription: res.data.description,
        };
        try {
          const data = JSON.parse(localStorage.getItem(EDIT_INFO_STORAGE) ?? '');
          if (data) {
            formData.projectDescription = data.projectDescription;
            formData.website = data.website;
            if (formData.bannerUrl) {
              setProjectBannerUrl(formData.bannerUrl);
            }
          }
        } catch (e) {}
        form.setFieldsValue(formData);
      }
    });
  }, [ticker]);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const onFieldChange = (changedFields: any, allFields: any) => {
    console.log('onFieldsChange', changedFields);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleUpload = (file: File) => {
    if (file) {
      uploadFile(file).then((res) => {
        form.setFieldValue('banners', [res.data.file]);
        setProjectBannerUrl(res.data.fileUrl);
      });
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const edit = searchParams.get('edit');
      let updateParams = null;
      try {
        updateParams = JSON.parse(localStorage.getItem(UPDATE_PROJECT_TWITTER_STORAGE) ?? '');
      } catch (e) {}
      if (!updateParams) {
        return;
      }
      if (state === 'twitter' && code && updateParams && edit && updateParams.ticker === ticker) {
        const params = {
          code,
          grantType: 'authorization_code',
          // clientd: twitterClientId,
          redirectUri: twitterRedirectUri,
          codeVerifier: 'challenge',
          refreshToken: '',
          appClientId: updateParams.clientId ?? '',
        };
        getTwitterAccessToken(params).then((res) => {
          const { access_token, twitter } = res.data;
          setTwitterAccessToken(access_token);
          setTwitter(twitter);
        });
        setOpen(true);
      }
    })();
  }, [searchParams]);

  const handleRemove = () => {
    setProjectBannerUrl('');
  };
  const connectTwitter = async () => {
    const formData = form.getFieldsValue();
    console.log('formData: ', formData);
    formData.bannerUrl = projectBannerUrl;
    localStorage.setItem(EDIT_INFO_STORAGE, JSON.stringify(formData));
    const res = await getTwitterClientId();
    let clientId = res.data;
    const updategParams = {
      ticker,
      twitter,
      clientId,
    };
    localStorage.setItem(UPDATE_PROJECT_TWITTER_STORAGE, JSON.stringify(updategParams));
    authorizeTwitter(clientId, twitterRedirectUri);
  };

  const handleSave = async (isConfirm: boolean) => {
    try {
      await form.validateFields();
      // twitter must have been connected
      // if (!twitter || !twitterAccessToken) {
      //   message.warning('Please connect project twitter first.');
      //   return;
      // }
      const data = form.getFieldsValue();
      data.twitter = twitter || '';
      data.accessToken = twitterAccessToken || '';
      // TODO check ticker if exits

      setConfirmLoading(true);
      const res = await saveEditInfo({ ...data, ticker });
      setOpen(false);
      if (res?.code === 200) {
        message.success('modify successfully!');
        onSaveSuccess();
        setOpen(false);
      } else {
        message.warning('fail in keeping');
      }
      localStorage.removeItem(UPDATE_PROJECT_TWITTER_STORAGE);
      localStorage.removeItem(EDIT_INFO_STORAGE);
    } catch (e) {
      console.log(e);
    } finally {
      setConfirmLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      localStorage.removeItem(UPDATE_PROJECT_TWITTER_STORAGE);
      localStorage.removeItem(EDIT_INFO_STORAGE);
    }
  }, [open]);

  const handleImageChange = (file: File) => {
    // const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
  };
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCrop = async () => {
    try {
      setCropLoading(true);
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      console.log('croppedImage:', croppedImage);
      if (croppedImage) {
        // const file = new File([croppedImage], 'croppedImage.jpg', { type: croppedImage.type });
        uploadFile(croppedImage).then((res) => {
          form.setFieldValue('banners', [res.data.file]);
          setProjectBannerUrl(res.data.fileUrl);
          setImage(null);
          setCropLoading(false);
        });
        return false;
      }
    } catch (e) {
      console.error('Error cropping image:', e);
      setCropLoading(false);
    }
  };
  const getCroppedImg = (
    imageSrc: string | null,
    crop: { width: number; height: number; x: number; y: number } | null,
  ) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc as string;
      image.crossOrigin = 'anonymous';

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context is not available'));
          return;
        }
        if (!crop) {
          reject(new Error('Crop context is not available'));
          return;
        }
        canvas.width = crop.width;
        canvas.height = crop.height;
        ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);

        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/jpeg');
      };

      image.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <>
      <Modal
        className="min-w-[717px] edit-profile-modal"
        wrapClassName="memoo_modal"
        title={
          <div className="flex items-center gap-x-[13px]">
            <span className="text-[24px] leading-6 font-404px edit-title">Edit Info</span>
            <img src="/create/icon-edit-project-title.png" />
          </div>
        }
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          // labelCol={{ span: 4 }}
          // wrapperCol={{ span: 20 }}
          layout="horizontal"
          disabled={false}
          onFinish={onFinish}
          onFieldsChange={onFieldChange}
          className="edit-profile-modal-form h-[409px] overflow-auto mt-[56px]"
        >
          <Form.Item
            label={
              <p className="flex items-end">
                <span className="w-[113px] whitespace-normal">Username </span>
              </p>
            }
            name="username"
            // rules={[{ required: true, message: 'Please input Username!' }]}
          >
            <Input
              placeholder=""
              style={{ resize: 'none', borderRadius: '7px' }}
              className="text-[#fff] bg-[#2b526e]"
            />
          </Form.Item>
          <Form.Item
            label={
              <p className="flex items-end">
                <span className="w-[113px] whitespace-normal">Bio </span>
              </p>
            }
            name="projectDescription"
            rules={[{ required: true, message: 'Please input Project Description!' }]}
          >
            <Input.TextArea
              showCount
              maxLength={160}
              placeholder=""
              style={{ height: '87px', resize: 'none', borderRadius: '7px' }}
              className="text-[#fff] bg-[#2b526e]"
            />
          </Form.Item>
          <div className="flex gap-x-[56px]">
            <Form.Item
              label={<p className="whitespace-pre-wrap">{`Profile\nImage`}</p>}
              valuePropName="bannerList"
              getValueFromEvent={normFile}
              name="banners"
            >
              {projectBannerUrl ? (
                <div className="project-url-container">
                  <img src={projectBannerUrl} alt="" />
                  <span className="icon-url-actions">
                    <Trash size={16} onClick={handleRemove} />
                  </span>
                </div>
              ) : image ? (
                <div className="flex flex-col">
                  <div className="w-full h-[40vh] ">
                    <Cropper
                      image={image}
                      crop={crop}
                      zoom={zoom}
                      aspect={16 / 6}
                      showGrid={false}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>
                </div>
              ) : (
                <Upload
                  listType="picture-card"
                  accept="image/*"
                  maxCount={1}
                  beforeUpload={(file) => handleImageChange(file)}
                  showUploadList={{ showPreviewIcon: true, showRemoveIcon: false }}
                  style={{ width: '100%', height: 140 }}
                  className="edit-upload-banner w-[125px]"
                  previewFile={(file) => {
                    return new Promise((resolve) => {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onload = () => {
                        resolve(reader.result as string);
                      };
                    });
                  }}
                >
                  <button style={{ border: 0, background: 'none' }} type="button">
                    <div style={{ marginTop: 8 }} className="flex flex-col jusity-center items-center">
                      <IconUpload className="" />
                      <p className="font-OCR text-[10px] text-green leading-4 text-center w-[158px] mt-[10px]">
                        Upload Image
                      </p>
                    </div>
                  </button>
                </Upload>
              )}
            </Form.Item>
            <div className="flex gap-x-[13px] h-[125px]">
              <p className="whitespace-pre-wrap text-white font-OCR text-[14px] font-normal">{`Profile\nBanner`}</p>
              <div className="flex-1">
                {projectBannerUrl ? (
                  <div className="project-url-container w-full">
                    <img src={projectBannerUrl} alt="" />
                    <span className="icon-url-actions">
                      <Trash size={16} onClick={handleRemove} />
                    </span>
                  </div>
                ) : (
                  <Upload
                    listType="picture-card"
                    accept="image/*"
                    maxCount={1}
                    beforeUpload={(file) => handleUpload(file)}
                    showUploadList={{ showPreviewIcon: true, showRemoveIcon: false }}
                    style={{ width: '267px', height: 140 }}
                    className="edit-upload-banner w-[267px]"
                    previewFile={(file) => {
                      return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                          resolve(reader.result as string);
                        };
                      });
                    }}
                  >
                    <button style={{ border: 0, background: 'none' }} type="button">
                      <div style={{ marginTop: 8 }} className="flex flex-col jusity-center items-center">
                        <IconUpload className="" />
                        <p className="font-OCR text-[10px] text-green leading-4 text-center w-[158px] mt-[10px]">
                          Recommended 790px X 307px Max size: 10MB
                        </p>
                      </div>
                    </button>
                  </Upload>
                )}
              </div>
            </div>
          </div>
          <Form.Item label={<p>Twitter</p>}>
            <div className="flex items-center">
              <div style={{ width: '15px' }} className="mr-[7px]">
                <IconTwitter hoverColor="#07E993" className="" />
              </div>
              {twitter && <img className="mr-[7px]" src="/create/icon-authed.svg" />}
              <ConnectButton variant="secondary" className="w-[136px] h-[32px]" onClick={connectTwitter}>
                {!twitter ? 'CONNECT' : 'CHANGE'}
              </ConnectButton>
            </div>
          </Form.Item>
          <Form.Item label={<p className="edit-form-label">Website</p>} name="website">
            <div className="reactive">
              <Input
                className="custom-input rounded-[7px] px-8"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
              <img className="website-logo" src="/create/icon-website.png" alt="" />
            </div>
          </Form.Item>
          <Form.Item label={<p className="edit-form-label">ID</p>} name="id">
            <span>{form.getFieldValue('id')}</span>{' '}
            <IconCopy className="" onClick={() => handleCopy(form.getFieldValue('id'))} />
          </Form.Item>
          {/* <Form.Item label={<p className="w-[113px] whitespace-normal edit-form-label">Creator’s Twitter</p>}>
            <div className="flex items-center">
              <div style={{ width: '15px' }} className="mr-[7px]">
                <IconTwitter hoverColor="#07E993" className="" />
              </div>
              {twitterAccessToken && <img src="./create/icon-authed.svg" />}
              {!twitterAccessToken && (
                <ConnectButton variant="secondary" className="w-[136px] h-[32px]" onClick={connectTwitter}>
                  CONNECT
                </ConnectButton>
              )}
            </div>
          </Form.Item> */}
          {/* <Form.Item
            label={<p className="w-[113px] whitespace-normal edit-form-label">Pinned Twitter links</p>}
            name="links"
          >
            <Input maxLength={20} className="custom-input" />
            <Input maxLength={20} className="custom-input mt-[15px]" />
          </Form.Item> */}
        </Form>
        <div className="edit_project flex flex-col">
          <Button className="memoo_button mt-4 h-[50px]" onClick={() => handleSave(true)} loading={confirmLoading}>
            Save
          </Button>
        </div>
      </Modal>
      {Children.map(children, (child) => {
        if (isValidElement<{ onClick: () => void }>(child)) {
          return cloneElement(child, { onClick: () => setOpen(true) });
        }
        return child;
      })}
    </>
  );
};

EditProfileModal.displayName = EditProfileModal.name;

export default EditProfileModal;
