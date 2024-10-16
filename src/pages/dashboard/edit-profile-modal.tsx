/* eslint-disable no-debugger */
import { Button, Checkbox, Input, Modal, Slider, Form, Upload } from 'antd';
import message from '@/components/IMessage';
import { Children, FC, Fragment, ReactNode, cloneElement, isValidElement, useEffect, useState } from 'react';
import './edit-profile-modal.scss';
import { getTokenDetail, getTwitterAccessToken, uploadFile, getTwitterClientId } from '@/api/token';
import qs from 'qs';
import { Button as ConnectButton } from '@/components/ui/button';
import { IconTwitter, IconUpload, IconWebsite } from '@/components/icons';
import { Trash } from 'lucide-react';
import { REQUEST_FOLLOWING_STORAGE, UPDATE_PROJECT_TWITTER_STORAGE, EDIT_INFO_STORAGE } from '@/constants';
import { useSearchParams } from 'react-router-dom';
import { authorizeTwitter } from '@/utils';
import { IconCopy } from '@/components/icons';
import { handleCopy, clipAddress } from '@/utils';
import Cropper from 'react-easy-crop';
import { ZOOM_STEP, PREFIX } from '@/components/ImgCrop/constants';
import { editProfile, getUserProfile } from '@/api/profile';
import { useAccount } from '@/hooks/useWeb3';

const FORM_STORAGE_KEY = 'create_token_storage';
const twitterClientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
const twitterRedirectUri = import.meta.env.VITE_TWITTER_FOLLOW_REDIRECT_URI;
const minZoom = 1;
const maxZoom = 3;

type CropType = 'profile' | 'banner';
const EditProfileModal: FC<{ children: ReactNode; ticker: string; onSaveSuccess: () => void }> = ({
  children,
  ticker,
  onSaveSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [connectTwitterLoading, setConnectTwitterLoading] = useState(false);
  const [twitterAccessToken, setTwitterAccessToken] = useState('');
  const [profileBannerUrl, setProfileBannerUrl] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [twitter, setTwitter] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [projectDetail, setProjectDetail] = useState({});
  const [searchParams] = useSearchParams();
  const [website, setWebsite] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileBannerImage, setProfileBannerImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropLoading, setCropLoading] = useState(false);
  const [cropType, setCropType] = useState<CropType>('profile');
  const { address } = useAccount();

  useEffect(() => {
    if (!address) return;
    getUserProfile(address.toBase58()).then((res) => {
      if (res?.data) {
        console.log('TokenDetail: ', res?.data);
        setProjectDetail(res.data);
        setProfileBannerUrl(res.data?.profileBanner ? res.data?.profileBanner[0] : '');
        setProfileUrl(res.data?.profileImage ? res.data?.profileImage : '');
        setTwitter(res.data.twitter);
        setTwitterAccessToken(res.data.twitterAccessToken);
        setWebsite(res.data.website);
        // get data from local
        let formData = {
          ...res.data,
          profileBanner: res.data?.oldBanners ? res.data?.oldBanners : [],
        };
        form.setFieldsValue(formData);
      }
    });
  }, [address]);

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
        setProfileBannerUrl(res.data.fileUrl);
      });
      return false;
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('handleMessage-event:', event);
      const data = event.data;
      console.log('Received data from child window:', data);
      console.log('twitter-code', data.code);
      if (data.code && data.state === 'twitter' && data.type === 'twitter_bind') {
        const updateParams = JSON.parse(localStorage.getItem(UPDATE_PROJECT_TWITTER_STORAGE) ?? '');
        const params = {
          code: data.code ?? '',
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
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleRemove = (type: string) => {
    type === 'profile' ? setProfileUrl('') : setProfileBannerUrl('');
  };
  const connectTwitter = async () => {
    const formData = form.getFieldsValue();
    console.log('formData: ', formData);
    formData.bannerUrl = profileBannerUrl;
    // localStorage.setItem(EDIT_INFO_STORAGE, JSON.stringify(formData));
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
      // data.accessToken = twitterAccessToken || '';

      console.log(data);
      // TODO check ticker if exits
      debugger;
      setConfirmLoading(true);
      const res = await editProfile({ ...data });
      setOpen(false);
      if (res?.code === 200) {
        message.success('modify successfully!');
        onSaveSuccess();
        setOpen(false);
      } else {
        message.warning('fail in keeping');
      }
      localStorage.removeItem(UPDATE_PROJECT_TWITTER_STORAGE);
      // localStorage.removeItem(EDIT_INFO_STORAGE);
    } catch (e) {
      console.log(e);
    } finally {
      setConfirmLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      localStorage.removeItem(UPDATE_PROJECT_TWITTER_STORAGE);
      // localStorage.removeItem(EDIT_INFO_STORAGE);
    }
  }, [open]);

  const handleImageChange = (file: File, type: CropType) => {
    // const file = e.target.files[0];
    if (file) {
      setCropType(type);
      const reader = new FileReader();
      reader.onload = () => {
        type === 'profile' ? setProfileImage(reader.result as any) : setProfileBannerImage(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
  };
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCrop = async (type: string) => {
    try {
      setCropLoading(true);
      const croppedImage = await getCroppedImg(
        type === 'profile' ? profileImage : profileBannerImage,
        croppedAreaPixels,
      );
      console.log('croppedImage:', croppedImage);
      if (croppedImage) {
        // const file = new File([croppedImage], 'croppedImage.jpg', { type: croppedImage.type });
        uploadFile(croppedImage).then((res) => {
          if (type === 'profile') {
            form.setFieldValue('profileImage', [res.data.file]);
            setProfileUrl(res.data.fileUrl);
            setProfileImage(null);
            setCropLoading(false);
          } else {
            form.setFieldValue('profileBanner', [res.data.file]);
            setProfileBannerUrl(res.data.fileUrl);
            setProfileBannerImage(null);
            setCropLoading(false);
          }
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
            name="userName"
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
            name="userBio"
            rules={[{ required: true, message: 'Please input Bio!' }]}
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
              name="profileImage"
            >
              {profileUrl ? (
                <div className="project-url-container w-[125px] h-[125px]">
                  <img src={profileUrl} alt="" />
                  <span className="icon-url-actions">
                    <Trash size={16} onClick={() => handleRemove('profile')} />
                  </span>
                </div>
              ) : (
                <Upload
                  listType="picture-card"
                  accept="image/*"
                  maxCount={1}
                  beforeUpload={(file) => handleImageChange(file, 'profile')}
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
                    <div style={{ marginTop: 8 }} className="flex flex-col justify-center items-center">
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
                {profileBannerUrl ? (
                  <div className="project-url-container w-full">
                    <img src={profileBannerUrl} alt="" />
                    <span className="icon-url-actions">
                      <Trash size={16} onClick={() => handleRemove('banner')} />
                    </span>
                  </div>
                ) : (
                  <Upload
                    listType="picture-card"
                    accept="image/*"
                    maxCount={1}
                    beforeUpload={(file) => handleImageChange(file, 'banner')}
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
          {(profileImage || profileBannerImage) && (
            <Form.Item label="&nbsp;">
              {profileImage && (
                <div>
                  <div className="flex flex-col">
                    <div className="w-full h-[40vh] ">
                      <Cropper
                        image={profileImage}
                        crop={crop}
                        zoom={zoom}
                        aspect={cropType === 'banner' ? 16 / 6 : 1}
                        showGrid={false}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                      />
                    </div>
                  </div>
                </div>
              )}
              {profileBannerImage && (
                <div>
                  <div className="flex flex-col">
                    <div className="w-full h-[40vh] ">
                      <Cropper
                        image={profileBannerImage}
                        crop={crop}
                        zoom={zoom}
                        aspect={cropType === 'banner' ? 16 / 6 : 1}
                        showGrid={false}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-center gap-x-[10px] mt-[-20px]">
                <section className="flex w-[60%] items-center">
                  <button
                    className="text-[18px] text-[#07E993] disabled:text-[#1a5e5c]"
                    onClick={() => setZoom(Number((zoom - ZOOM_STEP).toFixed(1)))}
                    disabled={zoom - ZOOM_STEP < minZoom}
                  >
                    －
                  </button>
                  <Slider
                    className="flex1 w-full memoo_slider"
                    min={minZoom}
                    max={maxZoom}
                    step={ZOOM_STEP}
                    value={zoom}
                    onChange={setZoom}
                    tooltipVisible={false}
                  />
                  <button
                    className="text-[18px] text-[#07E993] disabled:text-[#1a5e5c]"
                    onClick={() => setZoom(Number((zoom + ZOOM_STEP).toFixed(1)))}
                    disabled={zoom + ZOOM_STEP > maxZoom}
                  >
                    ＋
                  </button>
                </section>
                <div className="flex justify-center items-center gap-x-[10px]">
                  <Button
                    className="memoo_button w-[115px] reverse"
                    onClick={() => {
                      setProfileImage(null);
                      setProfileBannerImage(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="memoo_button w-[115px] reverse"
                    onClick={() => handleCrop(cropType)}
                    loading={cropLoading}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Form.Item>
          )}
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
                onChange={(e) => {
                  setWebsite(e.target.value);
                  form.setFieldsValue({ website: e });
                }}
              />
              <img className="website-logo" src="/create/icon-website.png" alt="" />
            </div>
          </Form.Item>
          <Form.Item label={<p className="edit-form-label">ID</p>}>
            <div className="flex items-center gap-x-[4px]">
              <span className="font-OCR text-white text-[14px]leading-[16px]">
                {clipAddress(address?.toBase58() ?? '')}
              </span>{' '}
              <IconCopy className="" onClick={() => handleCopy(address?.toBase58() ?? '')} />
            </div>
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
