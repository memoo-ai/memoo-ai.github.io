/* eslint-disable no-debugger */
import { Button, Checkbox, Input, Modal, Slider, Form, Upload } from 'antd';
import message from '@/components/IMessage';
import {
  Children,
  FC,
  Fragment,
  ReactNode,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  useContext,
  SetStateAction,
} from 'react';
import './edit-project-modal.scss';
import {
  PreLaunchDurationEnum,
  saveTokenCraft,
  confirmTokenCreate,
  getTokenDetail,
  checkTickerExists,
  getTwitterAccessToken,
  uploadFile,
  saveEditInfo,
  getTwitterClientId,
} from '@/api/token';
import qs from 'qs';
import { Button as ConnectButton } from '@/components/ui/button';
import { IconTwitter, IconUpload, IconWebsite, IconTelegram, IconDiscord } from '@/components/icons';
import { Trash } from 'lucide-react';
import { REQUEST_FOLLOWING_STORAGE, UPDATE_PROJECT_TWITTER_STORAGE, EDIT_INFO_STORAGE } from '@/constants';
import { useSearchParams } from 'react-router-dom';
import { authorizeTwitter } from '@/utils';
import { AirdropContext } from '.';
import EasyCrop from '@/components/ImgCrop/EasyCrop';
import Cropper from 'react-easy-crop';
import { ZOOM_STEP, PREFIX } from '@/components/ImgCrop/constants';
import { PinnedTwitterData } from '@/types';

const FORM_STORAGE_KEY = 'create_token_storage';
const twitterClientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
const twitterRedirectUri = import.meta.env.VITE_TWITTER_FOLLOW_REDIRECT_URI;
const twitterCreatorRedirectUri = import.meta.env.VITE_TWITTER_CREATOR_REDIRECT_URI;

const minZoom = 1;
const maxZoom = 3;

const EditProjectModal: FC<{ children: ReactNode; ticker: string; onSaveSuccess: () => void }> = ({
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
  const [createTwitter, setCreateTwitter] = useState('');
  const [telegram, setTelegram] = useState('');
  const [discord, setDiscord] = useState('');
  const [website, setWebsite] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [cropLoading, setCropLoading] = useState(false);
  const [projectDetail, setProjectDetail] = useState({});
  const [searchParams] = useSearchParams();
  const { mine } = useContext(AirdropContext);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [pinnedTwitterUrl, setPinnedTwitterUrl] = useState([
    {
      id: 0,
      pinnedTwitterUrl: '',
    },
    {
      id: 0,
      pinnedTwitterUrl: '',
    },
    {
      id: 0,
      pinnedTwitterUrl: '',
    },
    {
      id: 0,
      pinnedTwitterUrl: '',
    },
  ]);
  useEffect(() => {
    getTokenDetail(ticker).then((res) => {
      if (res?.data) {
        console.log('TokenDetail: ', res?.data);
        setProjectDetail(res.data);
        setProjectBannerUrl(res.data?.banners ? res.data?.banners[0] : '');
        setTwitter(res.data.twitter);
        // setCreateTwitter(res.data.creatorTwitter);
        setTwitterAccessToken(res.data.twitterAccessToken);
        let pinnedTwitterUrls = [];

        if (res.data?.pinnedTwitterData) {
          pinnedTwitterUrls = res.data.pinnedTwitterData.map((item: PinnedTwitterData) => {
            return {
              id: item.id ?? 0,
              pinnedTwitterUrl: item.pinnedTwitterUrl,
            };
          });

          while (pinnedTwitterUrls.length < 4) {
            pinnedTwitterUrls.push({
              id: 0,
              pinnedTwitterUrl: '',
            });
          }
        }
        setPinnedTwitterUrl(pinnedTwitterUrls.length > 0 ? pinnedTwitterUrls : ['', '', '', '']);
        setTelegram(res.data.telegram);
        setDiscord(res.data.discord);
        setWebsite(res.data.website);
        // get data from local
        let formData = {
          ...res.data,
          banners: res.data?.oldBanners ? res.data?.oldBanners : [],
          tokenIcon: res.data.icon,
          projectDescription: res.data.description,
          discord: res.data.discord,
        };
        // try {
        //   const data = JSON.parse(localStorage.getItem(EDIT_INFO_STORAGE) ?? '');
        //   if (data) {
        //     formData.projectDescription = data.projectDescription;
        //     formData.website = data.website;
        //     if (formData.bannerUrl) {
        //       setProjectBannerUrl(formData.bannerUrl);
        //     }
        //   }
        // } catch (e) {}
        form.setFieldsValue(formData);
      }
    });
  }, [ticker]);
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
      } else if (data.code && data.state === 'twitter' && data.type === 'create') {
        const updateParams = JSON.parse(localStorage.getItem(UPDATE_PROJECT_TWITTER_STORAGE) ?? '');
        const params = {
          code: data.code ?? '',
          grantType: 'authorization_code',
          // clientd: twitterClientId,
          redirectUri: twitterCreatorRedirectUri,
          codeVerifier: 'challenge',
          refreshToken: '',
          appClientId: updateParams.clientId ?? '',
        };
        getTwitterAccessToken(params).then((res) => {
          const { access_token, twitter } = res.data;
          setTwitterAccessToken(access_token);
          setCreateTwitter(twitter);
        });
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
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

  const handleInputChange = (index: number, value: string) => {
    const updatedData = [...pinnedTwitterUrl];
    updatedData[index].pinnedTwitterUrl = value;
    setPinnedTwitterUrl(updatedData);
    form.setFieldsValue({ pinnedTwitterUrl: updatedData });
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

  // useEffect(() => {
  //   (async () => {
  //     const code = searchParams.get('code');
  //     const state = searchParams.get('state');
  //     const edit = searchParams.get('edit');
  //     let updateParams = null;
  //     try {
  //       updateParams = JSON.parse(localStorage.getItem(UPDATE_PROJECT_TWITTER_STORAGE) ?? '');
  //     } catch (e) {}
  //     if (!updateParams) {
  //       return;
  //     }
  //     if (state === 'twitter' && code && updateParams && edit && updateParams.ticker === ticker) {
  //       const params = {
  //         code,
  //         grantType: 'authorization_code',
  //         // clientd: twitterClientId,
  //         redirectUri: twitterRedirectUri,
  //         codeVerifier: 'challenge',
  //         refreshToken: '',
  //         appClientId: updateParams.clientId ?? '',
  //       };
  //       getTwitterAccessToken(params).then((res) => {
  //         const { access_token, twitter } = res.data;
  //         setTwitterAccessToken(access_token);
  //         setTwitter(twitter);
  //       });
  //       setOpen(true);
  //     }
  //   })();
  // }, [searchParams]);

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
      createTwitter,
    };
    localStorage.setItem(UPDATE_PROJECT_TWITTER_STORAGE, JSON.stringify(updategParams));
    authorizeTwitter(clientId, twitterRedirectUri);
  };
  const connectCreateTwitter = async () => {
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
      createTwitter,
    };
    localStorage.setItem(UPDATE_PROJECT_TWITTER_STORAGE, JSON.stringify(updategParams));
    authorizeTwitter(clientId, twitterCreatorRedirectUri);
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
      // data.creatorTwitter = createTwitter || '';
      data.accessToken = twitterAccessToken || '';
      data.website = website || '';
      data.discord = discord || '';
      data.telegram = telegram || '';
      // TODO check ticker if exits
      data.pinnedTwitterData = pinnedTwitterUrl;
      setConfirmLoading(true);

      const res = await saveEditInfo({ ...data, ticker });
      setOpen(false);
      if (res?.code === 200) {
        message.success('Edit successful!');
        setTimeout(() => {
          onSaveSuccess();
        }, 1000);
        setOpen(false);
      } else {
        message.warning('Edit failed');
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

  return (
    <>
      <Modal
        className="min-w-[717px] edit-project-modal"
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
          className="edit-project-modal-form h-[409px] overflow-auto mt-[56px]"
        >
          <Form.Item
            label={
              <p className="flex items-end">
                <span className="w-[113px] whitespace-normal">Project Description </span>
                <span>*</span>
              </p>
            }
            name="projectDescription"
            rules={[{ required: true, message: 'Please input Project Description!' }]}
          >
            <Input.TextArea
              showCount
              maxLength={450}
              placeholder=""
              style={{ height: 165, resize: 'none', borderRadius: '7px' }}
              className="text-[#fff] bg-[#2b526e]"
            />
          </Form.Item>
          <Form.Item
            label={
              <p>
                Project <br /> Twitter <span>*</span>
              </p>
            }
          >
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
          <Form.Item
            label={<p>Project Banner</p>}
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
                className="edit-upload-banner"
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
          </Form.Item>
          {image && (
            <Form.Item label="&nbsp;">
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
                      setImage(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className="memoo_button w-[115px] reverse" onClick={handleCrop} loading={cropLoading}>
                    Save
                  </Button>
                </div>
              </div>
            </Form.Item>
          )}
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
          <Form.Item label={<p className="whitespace-pre-wrap">{`Project\nTelegram`}</p>} name="telegram">
            <div className="reactive">
              <Input
                className="custom-input rounded-[7px] px-8"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
              />
              <IconTelegram className="website-logo w-[17px] h-[15px]" hoverColor="#07E993" />
            </div>
          </Form.Item>
          <Form.Item label={<p className="whitespace-pre-wrap">{`Project\nDiscord`}</p>} name="discord">
            <div className="reactive">
              <Input
                className="custom-input rounded-[7px] px-8"
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
              />
              <IconDiscord className="website-logo w-[17px] h-[15px]" color="#07E993" hoverColor="#07E993" />
            </div>
          </Form.Item>
          {/* <Form.Item label={<p>Creator’s Twitter</p>}>
            <div className="flex items-center">
              <img src="./token/icon-twitter.svg" className="w-4 h-4 mr-4" />
              {createTwitter && <img src="./create/icon-authed.svg" />}
              {!createTwitter && (
                <Button variant="secondary" className="w-[136px] h-[32px]" onClick={connectTwitter}>
                  CONNECT
                </Button>
              )}
            </div>
          </Form.Item> */}
          {/* <Form.Item label={<p className="whitespace-pre-wrap">{`Creator’s\nTwitter`}</p>}>
            <div className="flex items-center">
              <div style={{ width: '15px' }} className="mr-[7px]">
                <IconTwitter hoverColor="#07E993" className="" />
              </div>
              {createTwitter && <img className="mr-[7px]" src="/create/icon-authed.svg" />}
              <ConnectButton variant="secondary" className="w-[136px] h-[32px]" onClick={connectCreateTwitter}>
                {!createTwitter ? 'CONNECT' : 'CHANGE'}
              </ConnectButton>
            </div>
          </Form.Item> */}
          <Form.Item label={<p className="whitespace-pre-wrap">{`Pinned\nTwitter links`}</p>} name="pinnedTwitterUrl">
            <div className="flex flex-col items-center gap-y-[15px]">
              {pinnedTwitterUrl.map((data, index) => (
                <Input
                  key={index}
                  className="custom-input rounded-[7px]"
                  value={data.pinnedTwitterUrl}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ))}
            </div>
          </Form.Item>
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

EditProjectModal.displayName = EditProjectModal.name;

export default EditProjectModal;
