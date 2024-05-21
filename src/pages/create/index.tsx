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
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            disabled={false}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFieldsChange={onFieldChange}
          >
            <Form.Item
              label="Token Name *"
              name="tokenName"
              rules={[{ required: true, message: 'Please input token name!' }]}
            >
              <Input showCount maxLength={20} />
            </Form.Item>
            <Form.Item label="Ticker  *" name="ticker" rules={[{ required: true, message: 'Please input ticker!' }]}>
              <Input showCount maxLength={8} style={{ width: 140 }} />
            </Form.Item>

            <Form.Item label="Upload Icon *" valuePropName="fileList" getValueFromEvent={normFile} name="icon">
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

            <Form.Item label="Project Description *">
              <Input.TextArea
                showCount
                maxLength={100}
                placeholder="disable resize"
                style={{ height: 208, resize: 'none' }}
                className="custom-create-textarea"
              />
            </Form.Item>

            <Form.Item label="Proejct Twitter *">
              <div className="flex items-center">
                <img src="./token/icon-twitter.svg" className="w-4 h-4 mr-4" />
                <Button variant="secondary" className="w-[136px] h-[32px]">
                  CONNECT
                </Button>
              </div>
            </Form.Item>

            <Form.Item label="Pre-Launch Duration *" name="preLaunchDuration">
              <Radio.Group options={PreLaunchDurationOptions} optionType="button" buttonStyle="solid" />
            </Form.Item>
            <Form.Item label="Pre-Market Acquisition *" name="preMarketAcquisition">
              <MySlider min={0} max={30} />
            </Form.Item>
          </Form>

          <div>
            <p className="text-[#ffffff]">
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
              className="my-[24px] text-[#ffffff] border-[red]"
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
      </div>
    </div>
  );
}
