import { Button, Checkbox, Input, Modal, message, Slider, Form, Upload } from 'antd';
import { Children, FC, Fragment, ReactNode, cloneElement, isValidElement, useEffect, useState } from 'react';
import './edit-project-modal.scss';
import {
  PreLaunchDurationEnum,
  saveTokenCraft,
  confirmTokenCreate,
  getTokenDetail,
  checkTickerExists,
  getTwitterAccessToken,
  uploadFile,
} from '@/api/token';
import qs from 'qs';
import { Button as ConnectButton } from '@/components/ui/button';
import { IconTwitter, IconUpload, IconWebsite } from '@/components/icons';
import { Trash } from 'lucide-react';

const FORM_STORAGE_KEY = 'create_token_storage';
const twitterClientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
const twitterRedirectUri = import.meta.env.VITE_TWITTER_REDIRECT_URI;

const EditProjectModal: FC<{ children: ReactNode; ticker: string }> = ({ children, ticker }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [connectTwitterLoading, setConnectTwitterLoading] = useState(false);
  const [twitterAccessToken, setTwitterAccessToken] = useState('');
  const [projectBannerUrl, setProjectBannerUrl] = useState('');
  const [twitter, setTwitter] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [projectDetail, setProjectDetail] = useState({});

  useEffect(() => {
    getTokenDetail(ticker).then((res) => {
      if (res?.data) {
        console.log('TokenDetail: ', res?.data);
        setProjectDetail(res.data);
        setProjectBannerUrl(res.data.banners[0]);
        setTwitter(res.data.twitter);
        setTwitterAccessToken(res.data.twitterAccessToken);
        form.setFieldsValue({ ...res.data, tokenIcon: res.data.icon, projectDescription: res.data.description });
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

  const handleUpload = (file: File, filed: string) => {
    if (file) {
      uploadFile(file).then((res) => {
        form.setFieldValue(filed, res.data);
      });
      return false;
    }
  };

  const handleRemove = () => {
    setProjectBannerUrl('');
  };
  const connectTwitter = () => {
    // TODO: save form data to local; when callback from twitter, the form data will be lost.
    const formData = form.getFieldsValue();
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));

    setConnectTwitterLoading(true);

    let clientId = twitterClientId;
    let state = 'twitter';

    const params = {
      response_type: 'code',
      client_id: clientId,
      redirect_uri: twitterRedirectUri,
      scope: 'tweet.read%20tweet.write%20like.write%20users.read%20follows.read%20follows.write',
      state,
      code_challenge: 'challenge',
      code_challenge_method: 'plain',
    };
    const url = new URL(`https://twitter.com/i/oauth2/authorize`);
    url.search = qs.stringify(params, { encode: false });

    window.location.href = url.href;
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
      data.twitter = twitter;
      data.accessToken = twitterAccessToken;
      // TODO check ticker if exits

      setConfirmLoading(true);
      await confirmTokenCreate({ ...projectDetail, ...data }).then((res) => {
        setOpen(false);
        // if (res?.code === 200) {
        //   message.success('modify successfully!');
        //   setOpen(false);
        // } else {
        //   message.warning('fail in keeping');
        // }
      });
    } catch (e) {
      console.log(e);
    } finally {
      setConfirmLoading(false);
    }
  };
  return (
    <>
      <Modal
        className="min-w-[717px] edit-project-modal"
        wrapClassName="memoo_modal"
        title={
          <div className="flex items-center gap-x-[13px]">
            <span className="text-[24px] leading-6 font-404px">Edit Info</span>
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
                Project Twitter <span>*</span>
              </p>
            }
          >
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
            ) : (
              <Upload
                listType="picture-card"
                accept="image/*"
                maxCount={1}
                beforeUpload={(file) => handleUpload(file, 'banners')}
                showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
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
                      Recommended 790px X 307px Max size: 50MB
                    </p>
                  </div>
                </button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item label={<p className="edit-form-label">Other links</p>} name="links">
            <Input maxLength={20} className="custom-input" />
          </Form.Item>
          <Form.Item label={<p className="w-[113px] whitespace-normal edit-form-label">Creator’s Twitter</p>}>
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
          </Form.Item>
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

EditProjectModal.displayName = EditProjectModal.name;

export default EditProjectModal;
