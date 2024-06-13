import './index.scss';
import BackButton from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useMemo, useCallback } from 'react';
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
  message,
} from 'antd';
import { TextArea } from '@radix-ui/themes';
import MySlider from '@/components/MySlider';
import {
  PreLaunchDurationEnum,
  saveTokenCraft,
  confirmTokenCreate,
  getTokenDetail,
  checkTickerExists,
  getTwitterAccessToken,
  uploadFile,
  getTwitterClientId,
  requestTwitterFollow,
} from '@/api/token';
import qs from 'qs';

import { useSearchParams, useNavigate } from 'react-router-dom';
import { Trash } from 'lucide-react';
import { useManageContract } from '@/hooks/useManageContract';
import { parseEther, formatEther } from 'ethers';
import { useMemeFactoryContract } from '@/hooks/useMemeFactoryContract';
import { ZERO_ADDRESS } from '@/constants';
import { useAccount } from 'wagmi';
import { formatDecimals } from '@/utils';
import BigNumber from 'bignumber.js';

const twitterClientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
const twitterRedirectUri = import.meta.env.VITE_TWITTER_REDIRECT_URI;
const FORM_STORAGE_KEY = 'create_token_storage';
const TWITTER_CLIENT_ID_KEY = 'twitter_client_id';
const PreLaunchDurationOptions = [
  { label: 'immediate', value: PreLaunchDurationEnum.IMMEDIATE },
  { label: '1 day', value: PreLaunchDurationEnum['1DAY'] },
  { label: '3 days', value: PreLaunchDurationEnum['3DAYS'] },
];
export default function Create() {
  const { address } = useAccount();
  const [searchParams] = useSearchParams();
  const [isAccept, setIsAccept] = useState(false);
  const [optionalOpen, setOptionalOpen] = useState(false);
  const [form] = Form.useForm();
  const [saveCraftLoading, setSaveCraftLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [iconUrl, setIconUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const { config: memooConfig, defaultConfig, createMeme, createMemeLoading } = useManageContract();
  const [connectTwitterLoading, setConnectTwitterLoading] = useState(false);
  const [twitter, setTwitter] = useState('');
  const [twitterAccessToken, setTwitterAccessToken] = useState('');
  const [clientId, setClientId] = useState('');
  const [preMarketAcquisition, setPreMarketAcquisition] = useState(0);
  console.log('memooConfig: ', memooConfig);
  const { getMemeAddressWithSymbol } = useMemeFactoryContract();
  const navigate = useNavigate();
  const firstProportion = useMemo(() => Number(memooConfig?.allocation.creator) / 10000, [memooConfig]);
  const maxProportion = useMemo(() => Number(memooConfig?.idoCreatorBuyLimit) / 10000, [memooConfig]);
  const firstIncrease = useMemo(() => {
    if (!memooConfig || !defaultConfig) return 0;

    const totalSupplyBN = new BigNumber(Number(defaultConfig?.totalSupply)).dividedBy(
      10 ** defaultConfig?.defaultDecimals,
    );
    const idoPriceBN = new BigNumber(Number(defaultConfig?.idoPrice)).dividedBy(10 ** defaultConfig?.defaultDecimals);
    const result = totalSupplyBN.multipliedBy(idoPriceBN).multipliedBy(firstProportion);
    return parseFloat(formatDecimals(result));
  }, [memooConfig, firstProportion, defaultConfig]);
  // console.log('memooConfig.platformFeeCreateMeme:', formatDecimals(memooConfig.platformFeeCreateMeme));
  const totalCap = useMemo(() => {
    if (!memooConfig || !defaultConfig) return 0;

    const platformFeeCreateMeme = new BigNumber(Number(memooConfig?.platformFeeCreateMeme)).dividedBy(
      10 ** defaultConfig?.defaultDecimals,
    );
    return parseFloat(platformFeeCreateMeme.toString());
  }, [memooConfig, defaultConfig]);

  const totalCapInitial = useMemo(() => {
    if (!memooConfig || !defaultConfig) return 0;
    const rate = Number(memooConfig.idoCreatorBuyLimit) / 10000;
    return Number(formatEther(defaultConfig?.idoPrice)) * Number(formatEther(defaultConfig?.totalSupply)) * rate;
  }, [memooConfig, defaultConfig]);
  console.log('memooConfig: ', memooConfig);
  console.log('totalCapInitial: ', totalCapInitial);
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

  const handleUpload = (file: File, field: string) => {
    if (file) {
      uploadFile(file).then((res) => {
        form.setFieldValue(field, field === 'banners' ? [res.data.file] : res.data.file);
        if (field === 'icon') {
          setIconUrl(res.data.fileUrl);
        }
        if (field === 'banners') {
          setBannerUrl(res.data.fileUrl);
        }
      });
      return false;
    }
  };

  const connectTwitter = useCallback(async () => {
    // TODO: save form data to local; when callback from twitter, the form data will be lost.
    const res = await getTwitterClientId();
    const formData = form.getFieldsValue();
    console.log('formData: ', formData);
    formData.iconUrl = iconUrl;
    formData.bannerUrl = bannerUrl;
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));

    setConnectTwitterLoading(true);

    let clientId = res.data;
    localStorage.setItem(TWITTER_CLIENT_ID_KEY, clientId);
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
  }, [iconUrl, bannerUrl]);

  useEffect(() => {
    const ticker = searchParams.get('ticker');
    console.log('ticker: ', ticker);
    if (ticker) {
      getTokenDetail(ticker).then((res) => {
        console.log('getTokenDetail:', res);
        console.log('setPreMarketAcquisition:', res.data.preMarketAcquisition);
        if (res?.data) {
          // get twitter binded data
          setIconUrl(res.data.icon);
          setBannerUrl(res.data?.banners ? res.data?.banners[0] : '');
          setTwitter(res.data.twitter);
          setTwitterAccessToken(res.data.twitterAccessToken);
          setPreMarketAcquisition(res.data.preMarketAcquisition);
          form.setFieldsValue({
            ...res.data,
            icon: res.data.oldIcon,
            banners: res.data?.oldBanners ? res.data?.oldBanners[0] : [],
            projectDescription: res.data.description,
          });
          console.log('form:', form);
        }
      });
    } else {
      console.log('no-ticker');
      const data = localStorage.getItem(FORM_STORAGE_KEY);

      if (data) {
        try {
          const formData = JSON.parse(data);
          console.log('data: ', formData);
          if (!formData.preLaunchDuration) {
            formData.preLaunchDuration = PreLaunchDurationEnum['IMMEDIATE'];
          }
          form.setFieldsValue(formData);
          if (formData.icon) {
            setIconUrl(formData.iconUrl);
          }
          if (formData.banners) {
            setBannerUrl(formData.bannerUrl);
          }
        } catch (e) {}
      } else {
        form.setFieldsValue({
          preLaunchDuration: PreLaunchDurationEnum['IMMEDIATE'],
        });
      }
    }
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const clientId = localStorage.getItem(TWITTER_CLIENT_ID_KEY);
    if (state === 'twitter' && code) {
      // TODO test twitter follow
      const followParams = {
        appClientId: clientId ?? '',
        code,
        codeVerifier: 'challenge',
        grantType: 'authorization_code',
        redirectUri: twitterRedirectUri,
        refreshToken: '',
        twitter: 'elonmusk',
      };
      requestTwitterFollow(followParams).then((res) => {
        console.log('follow res: ', res);
      });
      // call api to bind
      const params = {
        code,
        grantType: 'authorization_code',
        // clientd: twitterClientId,
        redirectUri: twitterRedirectUri,
        codeVerifier: 'challenge',
        refreshToken: '',
        appClientId: clientId ?? '',
      };
      getTwitterAccessToken(params).then((res) => {
        const { access_token, twitter } = res.data;
        setTwitterAccessToken(access_token);
        setTwitter(twitter);
      });
    }
  }, [searchParams]);

  const payFee = useCallback(async () => {
    const data = form.getFieldsValue();

    const preLaunchSecond =
      data.preLaunchDuration === PreLaunchDurationEnum.IMMEDIATE
        ? 0
        : data.preLaunchDuration === PreLaunchDurationEnum['1DAY']
        ? 24 * 3600
        : 3 * 24 * 3600;
    const preValue = totalCapInitial * data.preMarketAcquisition;
    console.log('preValue: ', preValue);
    const value = parseEther(String(preValue)) + memooConfig!.platformFeeCreateMeme;
    const res = await createMeme(data.tokenName, data.ticker, preLaunchSecond, value);
    console.log('res: ', res);
    return res;
  }, [createMeme]);

  const handleSave = useCallback(
    // TODO check login
    async (isConfirm: boolean) => {
      if (!address) {
        message.warning('Please connect wallet first.');
        return;
      }
      try {
        const data = form.getFieldsValue();
        const tokenAddress = await getMemeAddressWithSymbol(data.ticker);
        console.log('tokenAddress: ', tokenAddress);
        if (tokenAddress && tokenAddress !== ZERO_ADDRESS) {
          message.warning(`${data.ticker} is already taken. Please choose another one.`);
          return;
        }

        if (!isAccept) {
          message.warning('Please accept the terms and conditions.');
          return;
        }
        await form.validateFields();
        // twitter must have been connected
        // if (!twitter) {
        //   message.warning('Please connect project twitter first.');
        //   return;
        // }

        data.twitter = twitter;
        data.accessToken = twitterAccessToken;
        if (isConfirm) {
          setConfirmLoading(true);
          const res = await confirmTokenCreate(data);
          console.log('res: ', res);
          const feeRes = await payFee();
          if (!feeRes) {
            message.error('Create failed.');
            return;
          }
          localStorage.removeItem(FORM_STORAGE_KEY);
          message.success('Congratulations! Create meme successfully!');
          // Go to dashboard
          navigate('/dashboard');
        } else {
          setSaveCraftLoading(true);
          const res = await saveTokenCraft(data);
          console.log('res: ', res);
          // clear
          localStorage.removeItem(FORM_STORAGE_KEY);
          message.success('Save meme craft successfully!');
          // Go to dashboard
          navigate('/dashboard');
        }
      } catch (e) {
        console.log(e);
      } finally {
        setSaveCraftLoading(false);
        setConfirmLoading(false);
      }
    },
    [twitter, twitterAccessToken, isAccept, payFee],
  );

  const handleRemove = () => {
    setIconUrl('');
  };
  const handleRemoveBanner = () => {
    setBannerUrl('');
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
              <div className="token-icon-form-item">
                {/* <Input style={{ display: 'none' }} /> */}
                {iconUrl && (
                  <div className="icon-url-container">
                    <img src={iconUrl} alt="" />
                    <span className="icon-url-actions">
                      <Trash size={16} onClick={handleRemove} />
                    </span>
                  </div>
                )}
                {!iconUrl && (
                  <Upload
                    listType="picture-card"
                    accept="image/*"
                    maxCount={1}
                    beforeUpload={(file) => handleUpload(file, 'icon')}
                    showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
                    style={{ width: 140, height: 140 }}
                    className="custom-upload-icon"
                  >
                    <button style={{ border: 0, background: 'none', width: '100%', height: '100%' }} type="button">
                      <div style={{ marginTop: 8 }} className="flex flex-col jusity-center items-center">
                        <img src="./token/icon-upload.svg" alt="upload" className="w-[30px] h-[30px]" />
                        <p className="font-OCR text-[10px] text-green leading-4">Upload Image</p>
                      </div>
                    </button>
                  </Upload>
                )}
              </div>
            </Form.Item>

            <Form.Item
              label={
                <p>
                  Project Description <span>*</span>
                </p>
              }
              name="projectDescription"
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
                {twitter && <img src="./create/icon-authed.svg" />}
                {!twitter && (
                  <Button variant="secondary" className="w-[136px] h-[32px]" onClick={connectTwitter}>
                    CONNECT
                  </Button>
                )}
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
              style={{ marginTop: '40px' }}
            >
              {/* <MySlider
                defaultValue={preMarketAcquisition}
                // min={firstProportion}
                // max={maxProportion}
                min={firstProportion}
                max={100}
                minPrice={0}
                maxPrice={totalCapInitial}
              /> */}
              <MySlider defaultValue={preMarketAcquisition} min={0} max={1} minPrice={0} maxPrice={totalCapInitial} />
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
                    name="banners"
                  >
                    <div className="token-icon-form-item">
                      {/* <Input style={{ display: 'none' }} /> */}
                      {bannerUrl && (
                        <div className="icon-url-container">
                          <img src={bannerUrl} alt="" />
                          <span className="icon-url-actions">
                            <Trash size={16} onClick={handleRemoveBanner} />
                          </span>
                        </div>
                      )}
                      <Upload
                        listType="picture-card"
                        accept="image/*"
                        maxCount={1}
                        beforeUpload={(file) => handleUpload(file, 'banners')}
                        showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
                        style={{ width: 140, height: 140 }}
                        className="custom-upload-banner"
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
                            <img src="./token/icon-upload.svg" alt="upload" className="w-[30px] h-[30px]" />
                            <p className="font-OCR text-[10px] text-green leading-4 text-center w-[158px]">
                              Recommended 790px X 307px Max size: 50MB
                            </p>
                          </div>
                        </button>
                      </Upload>
                    </div>
                  </Form.Item>
                  <Form.Item label={<p>Website</p>} name="links">
                    <Input maxLength={20} className="custom-input" />
                  </Form.Item>
                  {/* <Form.Item label="Creator's Twitter">
                    <Input maxLength={20} />
                    <div className="flex items-center">
                      <img src="./token/icon-twitter.svg" className="w-4 h-4 mr-4" />
                      <Button variant="secondary" className="w-[136px] h-[32px]">
                        CONNECT
                      </Button>
                    </div>
                  </Form.Item> */}
                </div>
              )}
            </div>
          </Form>

          <div>
            <p className="create_fee_desc">
              A platform Fee of {totalCap} ETH is applicable to facilitate your meme token creation. You will be
              entitled to {firstProportion * 100}% supply of your meme token. The token will be distributed post TGE
              after <span className="text-[#07E993]">‘fair conditions’</span> are met.{' '}
              <span className="text-[#07E993]">Click here</span>
              for the tokenomics disclosures.
            </p>
          </div>
          <div>
            <Checkbox
              value={isAccept}
              onChange={() => {
                setIsAccept(!isAccept);
              }}
              className="create_terms mt-[24px] text-[#ffffff] border-[red]"
            >
              I accept MeMoo’s <span className="text-[#07E993]">terms & conditions.</span>
            </Checkbox>
          </div>
          <div className="flex items-center mt-[48px]">
            <Button
              variant="secondary"
              className="w-[322px] h-[50px] uppercase"
              onClick={() => handleSave(false)}
              loading={saveCraftLoading}
            >
              <span className="flex items-center">
                <img src="./token/icon-save-draft.svg" className="w-[14px] mr-[10px]" />
                save draft
              </span>
            </Button>
            <Button
              variant="default"
              className="w-[322px] h-[50px] uppercase ml-[16px]"
              onClick={() => handleSave(true)}
              loading={confirmLoading}
            >
              confirm
            </Button>
          </div>
        </div>
        <img src="./create/img-create-bg.png" alt="" className="create_token_bg" />
      </div>
    </div>
  );
}