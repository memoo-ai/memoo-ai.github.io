import './index.scss';
import BackButton from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import { TextArea } from '@radix-ui/themes';
import MySlider from '@/components/MySlider';
const PreLaunchDurationOptions = [
  { label: 'immediate', value: 'immediate' },
  { label: '1 day', value: '1day' },
  { label: '3 days', value: '3days' },
];
export default function Create() {
  const [isAccept, setIsAccept] = useState(false);
  const [optionalOpen, setOptionalOpen] = useState(false);
  const [form] = Form.useForm();
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const onFieldChange = (changedFields: any, allFields: any) => {
    console.log('onFieldsChange', changedFields);
  };

  return (
    <div className="create_token">
      <div className="create_token_top">
        <div className="create_token_top_title">Create Token</div>
        <div className="create_token_top_back cursor-pointer">
          <BackButton />
        </div>
      </div>
      <div className="flex items-center mb-[30px]">
        <p className="create_project_title">Project Info</p>
        <p className="create_project_title_span">Fill out the fields marked with *</p>
      </div>
      <div className="create_token_content">
        <div className="create_token_content_form">
          <Form
            form={form}
            // labelCol={{ span: 4 }}
            // wrapperCol={{ span: 20 }}
            layout="horizontal"
            disabled={false}
            onFinish={onFinish}
            onFieldsChange={onFieldChange}
            className="create-form"
          >
            <Form.Item
              label={
                <p>
                  Token Name <span>*</span>
                </p>
              }
              name="tokenName"
              rules={[{ required: true, message: 'Please input token name!' }]}
            >
              <Input showCount maxLength={20} />
            </Form.Item>
            <Form.Item
              label={
                <p>
                  Ticker <span>*</span>
                </p>
              }
              name="ticker"
              rules={[{ required: true, message: 'Please input ticker!' }]}
            >
              <Input showCount maxLength={8} style={{ width: 140 }} />
            </Form.Item>

            <Form.Item
              label={
                <p>
                  Upload Icon <span>*</span>
                </p>
              }
              valuePropName="fileList"
              getValueFromEvent={normFile}
              name="icon"
            >
              <Upload
                listType="picture-card"
                accept="image/*"
                maxCount={1}
                beforeUpload={() => false}
                showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
                style={{ width: 140, height: 140 }}
                className="custom-upload-icon"
              >
                <button style={{ border: 0, background: 'none' }} type="button">
                  <div style={{ marginTop: 8 }} className="flex flex-col jusity-center items-center">
                    <img src="./token/icon-upload.svg" alt="upload" className="w-[30px] h-[30px]" />
                    <p className="font-OCR text-[10px] text-green leading-4">Upload Image</p>
                  </div>
                </button>
              </Upload>
            </Form.Item>

            <Form.Item
              label={
                <p>
                  Project Description <span>*</span>
                </p>
              }
            >
              <Input.TextArea
                showCount
                maxLength={100}
                placeholder="disable resize"
                style={{ height: 208, resize: 'none' }}
                className="custom-create-textarea"
              />
            </Form.Item>

            <Form.Item
              label={
                <p>
                  Proejct Twitter <span>*</span>
                </p>
              }
            >
              <div className="flex items-center">
                <img src="./token/icon-twitter.svg" className="w-4 h-4 mr-4" />
                <Button variant="secondary" className="w-[136px] h-[32px]">
                  CONNECT
                </Button>
              </div>
            </Form.Item>

            <Form.Item
              label={
                <p>
                  Pre-Launch Duration <span>*</span>
                </p>
              }
              name="preLaunchDuration"
            >
              <Radio.Group options={PreLaunchDurationOptions} optionType="button" buttonStyle="solid" />
            </Form.Item>
            <Form.Item
              label={
                <p>
                  Pre-Market Acquisition <span>*</span>
                </p>
              }
              name="preMarketAcquisition"
            >
              <MySlider min={0} max={30} />
            </Form.Item>
            <p className="create_tip_for_acquisition">
              The creator can enhance the initial allocation by purchasing an additional 30%
            </p>

            <div className="create_optional_info">
              <div className="create_optional_info_title">
                <p>Optional Info</p>
                <img
                  src={optionalOpen ? './create/icon-minus.svg' : './create/icon-plus.svg'}
                  alt=""
                  onClick={() => {
                    setOptionalOpen(!optionalOpen);
                  }}
                />
              </div>
              {optionalOpen && (
                <div className="create_optional_form">
                  <Form.Item
                    label={<p>Upload Project Banner</p>}
                    valuePropName="bannerList"
                    getValueFromEvent={normFile}
                    name="banner"
                  >
                    <Upload
                      listType="picture-card"
                      accept="image/*"
                      maxCount={1}
                      beforeUpload={() => false}
                      showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
                      style={{ width: 140, height: 140 }}
                      className="custom-upload-banner"
                    >
                      <button style={{ border: 0, background: 'none' }} type="button">
                        <div style={{ marginTop: 8 }} className="flex flex-col jusity-center items-center">
                          <img src="./token/icon-upload.svg" alt="upload" className="w-[30px] h-[30px]" />
                          <p className="font-OCR text-[10px] text-green leading-4 text-center w-[158px]">
                            Recommended 790px X 307px Max size: 50MB
                          </p>
                        </div>
                      </button>
                    </Upload>
                  </Form.Item>
                  <Form.Item label={<p>Other Links</p>} name="links">
                    <Input maxLength={20} />
                  </Form.Item>
                  <Form.Item label="Creator's Twitter">
                    <div className="flex items-center">
                      <img src="./token/icon-twitter.svg" className="w-4 h-4 mr-4" />
                      <Button variant="secondary" className="w-[136px] h-[32px]">
                        CONNECT
                      </Button>
                    </div>
                  </Form.Item>
                </div>
              )}
            </div>
          </Form>

          <div>
            <p className="create_fee_desc">
              A platform Fee of 0.05 ETH is applicable to facilitate your meme token creation. You will be entitled to
              5% supply of your meme token. The token will be distributed post TGE after{' '}
              <span className="text-[#07E993]">‘fair conditions’</span> are met.{' '}
              <span className="text-[#07E993]">Click here</span>
              for the tokenomics disclosures.
            </p>
          </div>
          <div>
            <Checkbox
              onChange={() => {
                setIsAccept(!isAccept);
              }}
              className="create_terms mt-[24px] text-[#ffffff] border-[red]"
            >
              I accept MeMoo’s <span className="text-[#07E993]">terms & conditions.</span>
            </Checkbox>
          </div>
          <div className="flex items-center mt-[48px]">
            <Button variant="secondary" className="w-[322px] h-[50px] uppercase">
              <span className="flex items-center">
                <img src="./token/icon-save-draft.svg" className="w-[14px] mr-[10px]" />
                save draft
              </span>
            </Button>
            <Button variant="default" className="w-[322px] h-[50px] uppercase ml-[16px]">
              confirm
            </Button>
          </div>
        </div>
        <img src="./create/img-create-bg.png" alt="" className="create_token_bg" />
      </div>
    </div>
  );
}
