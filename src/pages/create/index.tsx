/* eslint-disable no-debugger */
/* eslint-disable react/jsx-curly-brace-presence */
import './index.scss';
import BackButton from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
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
import message from '@/components/IMessage';
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
  payConfirm,
  requestTwitterFollow,
} from '@/api/token';
import qs from 'qs';

import { useSearchParams, useNavigate } from 'react-router-dom';
import { Trash } from 'lucide-react';
import { useManageContract } from '@/hooks/useManageContract';
import { parseEther, formatEther } from 'ethers';
import { useMemeFactoryContract } from '@/hooks/useMemeFactoryContract';
import { ZERO_ADDRESS } from '@/constants';
// import { useAccount, useSwitchChain } from 'wagmi';
import { useAccount } from '@/hooks/useWeb3';
import { formatDecimals, authorizeTwitter } from '@/utils';
import BigNumber from 'bignumber.js';
import { CHAIN_ID } from '@/constants';
import CreatedTokenCompleteConnectedModal from './create-token-complete-connected-modal';
import ITooltip from '@/components/ITooltip';
import { getMemeConfigId } from '@/api/base';
import { memooConfig } from '@/types';
import { useProportion } from '@/hooks/useProportion';
import { IconMinus, IconPlus, IconDiscord, IconTelegram } from '@/components/icons';
import ImgCrop from '@/components/ImgCrop';
import useSolanaWallet from '@/utils/solanaWeb3/solanaWallet';

const twitterClientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
const twitterRedirectUri = import.meta.env.VITE_TWITTER_REDIRECT_URI;
const twitterCreatorRedirectUri = import.meta.env.VITE_TWITTER_CREATOR_REDIRECT_URI;
console.log('twitterRedirectUri: ', twitterRedirectUri);
const FORM_STORAGE_KEY = 'create_token_storage';
const TWITTER_CLIENT_ID_KEY = 'twitter_client_id';
const PreLaunchDurationOptions = [
  { label: '0 + 1 DAY', value: PreLaunchDurationEnum.IMMEDIATE },
  { label: '1 + 1 DayS', value: PreLaunchDurationEnum['1DAY'] },
  { label: '3 + 1 Days', value: PreLaunchDurationEnum['3DAYS'] },
  // { label: 'immediate', value: PreLaunchDurationEnum.IMMEDIATE },
  // { label: '1 day', value: PreLaunchDurationEnum['1DAY'] },
  // { label: '3 days', value: PreLaunchDurationEnum['3DAYS'] },
];
const CurrentProductDescriptions = [
  'Tokenomics for Meme Tokens',
  'Standardize Smart Contract Rails',
  'Simplified IMO & LP Management',
  'Fair Launch Policy',
  'Fair Launch Smart Vesting',
];

interface CreatedTokenCompleteConnectedModalRef {
  setOpen: (open: boolean) => void;
}
const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
export default function Create() {
  // const { address, chainId } = useAccount();
  const { address, registerTokenMint } = useAccount();
  const {
    firstProportion,
    maxProportion,
    totalCapInitial,
    totalSupplyPrice,
    totalCap,
    creatorAllocation,
    platformFeeCreateMemeSol,
  } = useProportion();
  // const [memeConfigId, setmemeConfigId] = useState<memeConfigId>({});
  // const { switchChain } = useSwitchChain();
  const [searchParams] = useSearchParams();
  const [isAccept, setIsAccept] = useState(false);
  const [optionalOpen, setOptionalOpen] = useState(false);
  const [twitterCode, setTwitterCode] = useState('');
  const [form] = Form.useForm();
  const [saveCraftLoading, setSaveCraftLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [iconUrl, setIconUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [connectTwitterLoading, setConnectTwitterLoading] = useState(false);
  const [twitter, setTwitter] = useState('');
  const [createTwitter, setCreateTwitter] = useState('');
  const [twitterAccessToken, setTwitterAccessToken] = useState('');
  const [clientId, setClientId] = useState('');
  const [pinnedTwitterUrl, setPinnedTwitterUrl] = useState<string[]>(['', '', '', '']);
  const [preMarketAcquisition, setPreMarketAcquisition] = useState(0);
  const { getMemeAddressWithSymbol } = useMemeFactoryContract();
  const navigate = useNavigate();
  const createdTokenRef = useRef<CreatedTokenCompleteConnectedModalRef>(null);

  const { balance } = useSolanaWallet();
  // const [memooConfig, setMemooConfig] = useState<memooConfig>();
  // useEffect(() => {
  //   (async () => {
  //     const config = await getMemooConfig();
  //     // setMemooConfig(config);
  //     console.log('config:', config);
  //     console.log('firstProportion:', Number(config?.tokenAllocationCreator) / 10000);
  //     console.log('maxProportion:', Number(config?.idoCreatorBuyLimit) / 10000);
  //     // console.log('totalCap:', new BigNumber(Number(config?.platformFeeCreateMemeSol)).dividedBy(10 ** 18));
  //     console.log('totalCap:', config?.platformFeeCreateMemeSol.toNumber());
  //     const rate = Number(config?.idoCreatorBuyLimit) / 10000;
  //     console.log('totalCapInitial:', Number(config?.idoPrice) * Number(config?.totalSupply) * rate);
  //   })();
  // }, [address]);

  // console.log('totalCapInitial: ', totalCapInitial);
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // const invalidChain = useMemo(() => {
  //   return chainId !== CHAIN_ID;
  // }, [chainId]);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const onFieldChange = (changedFields: any, allFields: any) => {
    console.log('onFieldsChange', changedFields);
  };

  const handleUpload = (file: File, field: string) => {
    if (!address) {
      message.info('Please connect wallet first.');
      return;
    }
    if (file) {
      console.log(file);
      uploadFile(file).then((res) => {
        form.setFieldValue(field, field === 'banners' ? [res.data.file] : res.data.file);
        if (!form.isFieldsValidating()) {
          form.validateFields();
        }
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
    if (!address) {
      message.info('Please connect wallet first.');
      return;
    }
    const res = await getTwitterClientId();
    const formData = form.getFieldsValue();
    console.log('formData: ', formData);
    formData.iconUrl = iconUrl;
    formData.bannerUrl = bannerUrl;
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));

    setConnectTwitterLoading(true);

    let clientId = res.data;
    localStorage.setItem(TWITTER_CLIENT_ID_KEY, clientId);
    console.log('twitterRedirectUri: ', twitterRedirectUri);
    authorizeTwitter(clientId, twitterRedirectUri);
  }, [form, iconUrl, bannerUrl]);
  const connectCreatorTwitter = useCallback(async () => {
    // TODO: save form data to local; when callback from twitter, the form data will be lost.
    if (!address) {
      message.info('Please connect wallet first.');
      return;
    }
    const res = await getTwitterClientId();
    const formData = form.getFieldsValue();
    console.log('formData: ', formData);
    formData.iconUrl = iconUrl;
    formData.bannerUrl = bannerUrl;
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));

    setConnectTwitterLoading(true);

    let clientId = res.data;
    localStorage.setItem(TWITTER_CLIENT_ID_KEY, clientId);
    console.log('twitterRedirectUri: ', twitterCreatorRedirectUri);
    authorizeTwitter(clientId, twitterCreatorRedirectUri);
  }, [form, iconUrl, bannerUrl]);
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('handleMessage-event:', event);
      const data = event.data;
      console.log('Received data from child window:', data);
      setTwitterCode(data.code);
      console.log('twitter-code', data.code);
      if (data.code && data.state === 'twitter' && data.type === 'twitter_bind') {
        const clientId = localStorage.getItem(TWITTER_CLIENT_ID_KEY);
        const params = {
          code: data.code ?? '',
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
      } else if (data.code && data.state === 'twitter' && data.type === 'create') {
        const clientId = localStorage.getItem(TWITTER_CLIENT_ID_KEY);
        const params = {
          code: data.code ?? '',
          grantType: 'authorization_code',
          // clientd: twitterClientId,
          redirectUri: twitterCreatorRedirectUri,
          codeVerifier: 'challenge',
          refreshToken: '',
          appClientId: clientId ?? '',
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

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (state === 'twitter' && code) {
      const params = {
        code,
        state,
        type: 'create',
      };
      if (window.opener) {
        window.opener.postMessage(params, '*');
      }
      window.close();
    }
  }, [searchParams]);

  useEffect(() => {
    const ticker = searchParams.get('ticker');
    console.log('ticker: ', ticker);
    if (ticker) {
      getTokenDetail(ticker).then((res) => {
        console.log('getTokenDetail:', res);
        setIsAccept(true);
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
            banners: res.data?.oldBanners ? res.data?.oldBanners : [],
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
            formData.preLaunchDuration = PreLaunchDurationEnum['3DAYS'];
          }
          if (!formData.preMarketAcquisition) {
            formData.preMarketAcquisition = 0;
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
          preLaunchDuration: PreLaunchDurationEnum['3DAYS'],
        });
      }
    }
    // const code = searchParams.get('code');
    // const state = searchParams.get('state');
    // const clientId = localStorage.getItem(TWITTER_CLIENT_ID_KEY);
    // if (state === 'twitter' && code) {
    //   // TODO test twitter follow
    //   const followParams = {
    //     appClientId: clientId ?? '',
    //     code,
    //     codeVerifier: 'challenge',
    //     grantType: 'authorization_code',
    //     redirectUri: twitterRedirectUri,
    //     refreshToken: '',
    //     twitter: 'elonmusk',
    //   };
    //   // requestTwitterFollow(followParams).then((res) => {
    //   //   console.log('follow res: ', res);
    //   // });
    //   // call api to bind
    //   const params = {
    //     code,
    //     grantType: 'authorization_code',
    //     // clientd: twitterClientId,
    //     redirectUri: twitterRedirectUri,
    //     codeVerifier: 'challenge',
    //     refreshToken: '',
    //     appClientId: clientId ?? '',
    //   };
    //   getTwitterAccessToken(params).then((res) => {
    //     const { access_token, twitter } = res.data;
    //     setTwitterAccessToken(access_token);
    //     setTwitter(twitter);
    //   });
    // }
  }, [form, searchParams]);

  const payFee = useCallback(
    async (memeConfigId: string) => {
      const data = form.getFieldsValue();

      let preLaunchSecond = 0;
      if (data.preLaunchDuration === PreLaunchDurationEnum.IMMEDIATE) {
        preLaunchSecond = 0;
      } else if (data.preLaunchDuration === PreLaunchDurationEnum['1DAY']) {
        preLaunchSecond = 24 * 3600;
      } else {
        preLaunchSecond = 3 * 24 * 3600;
      }

      // const preValue = totalCapInitial * (data.preMarketAcquisition / 0.3);
      const preValue = totalSupplyPrice * (data.preMarketAcquisition ?? 0);
      console.log('totalCapInitial:', totalCapInitial);
      console.log('preValue: ', preValue);
      // const value = parseEther(String(preValue)) + memeConfigId!.platformFeeCreateMeme;
      // const value = parseEther(String(preValue));
      // const platformFeeCreateMeme = (totalCapInitial * 0.05) / 0.3;
      // console.log('platformFeeCreateMeme: ', platformFeeCreateMeme);
      // console.log(preValue + platformFeeCreateMeme);

      const value = new BigNumber(preValue.toFixed(2)).multipliedBy(new BigNumber(10).pow(9));
      console.log('value1:', Number(value).toString());
      // const value = parseEther(String(preValue)) + memooConfig!.platformFeeCreateMeme;
      // const res = await createMeme(data.tokenName, data.ticker, preLaunchSecond, value);

      const res = await registerTokenMint(memeConfigId!, Number(value).toString());
      console.log('res: ', res);
      return res;
    },
    [registerTokenMint, form, totalCapInitial],
  );

  const handleTickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    form.setFieldsValue({
      ticker: value.toUpperCase().trim(),
    });
  };

  const handleSave = useCallback(
    // TODO check login
    async (isConfirm: boolean) => {
      if (!address) {
        message.info('Please connect wallet first.', { key: 'Please connect wallet first.' });
        return;
      }
      // if (invalidChain) {
      //   switchChain({ chainId: Number(CHAIN_ID) });
      //   return;
      // }
      try {
        const data = form.getFieldsValue();
        // const tokenAddress = await getMemeAddressWithSymbol(data.ticker);
        // console.log('tokenAddress: ', tokenAddress);
        // if (tokenAddress && tokenAddress !== ZERO_ADDRESS) {
        //   message.warning(`${data.ticker} is already taken. Please choose another one.`);
        //   return;
        // }

        if (!isAccept) {
          message.info('Please accept the terms and conditions.', { key: 'Please accept the terms and conditions.' });
          return;
        }
        await form.validateFields();
        // twitter must have been connected
        // if (!twitter) {
        //   message.warning('Please connect project twitter first.');
        //   return;
        // }

        data.twitter = twitter;
        data.creatorTwitter = createTwitter;
        data.accessToken = twitterAccessToken;
        data.pinnedTwitterUrl = pinnedTwitterUrl;
        if (!data.preMarketAcquisition) data.preMarketAcquisition = 0;
        // data.twitter = 'twitter';
        // data.accessToken = 'twitterAccessToken';
        if (isConfirm) {
          // twitter must have been connected
          if (!twitter) {
            message.info('Please connect project twitter first.', { key: 'Please connect project twitter first.' });
            return;
          }
          if (Number(balance) < platformFeeCreateMemeSol + 0.0001) {
            message.warning(`Insufficient balance in the wallet to create`, {
              key: 'Insufficient balance in the wallet to create',
            });
            return;
          }
          setConfirmLoading(true);
          // data.ticker = data.ticker.toUpperCase();
          const res = await confirmTokenCreate(data);

          console.log('res-confirmTokenCreate: ', res);

          const { data: config } = await getMemeConfigId(res.data.Ticker);
          console.log('sonalaConfigMemeId:', config);

          const feeRes = await payFee(config.memeConfigId);
          if (feeRes) {
            await payConfirm({
              ticker: data.ticker,
              txHash: feeRes,
            });
          } else if (!feeRes) {
            message.error('Token Creation Failed.', { key: 'Create failed.' });
            return;
          }
          localStorage.removeItem(FORM_STORAGE_KEY);
          // message.success('Congratulations! Create meme successfully!');
          // Go to dashboard
          // navigate(`/airdrop/${res.data.Ticker}`);
          if (createdTokenRef?.current) {
            createdTokenRef.current.setOpen(true);
          }
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
      } catch (e: any) {
        console.log('error:', e);
        if (e?.errorFields) {
          form.scrollToField(e.errorFields[0].name, { behavior: 'smooth' });
        } else if (e?.code === 500 && e?.msg) {
          message.error(e.msg);
        } else {
          console.error('Other errors have occurred:', e);
        }
      } finally {
        setSaveCraftLoading(false);
        setConfirmLoading(false);
      }
    },
    [
      address,
      // invalidChain,
      // switchChain,
      form,
      getMemeAddressWithSymbol,
      isAccept,
      twitter,
      twitterAccessToken,
      payFee,
      navigate,
    ],
  );

  const handleRemove = () => {
    setIconUrl('');
  };
  const handleRemoveBanner = () => {
    setBannerUrl('');
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedData = [...pinnedTwitterUrl];
    updatedData[index] = value;
    setPinnedTwitterUrl(updatedData);
    form.setFieldsValue({ pinnedTwitterUrl: updatedData });
  };
  const handleNoWallet = () => {
    message.info('Please connect wallet first!', { key: 'icon-upload-no-wallet' });
  };

  return (
    <div className="create_token mb-[70px]">
      <div className="create_token_top">
        <div className="create_token_top_title">
          <span>Create Token</span>
          <img src="/create/img-create-icon.png" alt="" className="h-[96px]" />
        </div>
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
              <Input className="rounded-[7px]" showCount maxLength={20} />
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
              <Input className="rounded-[7px]" showCount maxLength={8} onChange={handleTickerChange} />
            </Form.Item>

            <Form.Item
              label={
                <p>
                  Upload Icon <span>*</span>
                </p>
              }
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Please upload icon!' }]}
              name="icon"
            >
              <div className="token-icon-form-item">
                {/* <Input style={{ display: 'none' }} /> */}
                {address && iconUrl && (
                  <div className="icon-url-container">
                    <img src={iconUrl} alt="" />
                    <span className="icon-url-actions">
                      <Trash size={16} onClick={handleRemove} />
                    </span>
                  </div>
                )}
                {address
                  ? !iconUrl && (
                      <ImgCrop
                        // rotationSlider
                        // showReset
                        modalClassName="memoo_modal memoo_upload"
                        modalTitle=" "
                        resetText="reset"
                        modalOk="Save"
                        modalCancel="Cancel"
                        quality={1}
                      >
                        <Upload
                          listType="picture-card"
                          accept="image/*"
                          maxCount={1}
                          beforeUpload={(file) => handleUpload(file, 'icon')}
                          showUploadList={{
                            showPreviewIcon: false,
                            showRemoveIcon: true,
                          }}
                          style={{ height: 140 }}
                          className="custom-upload-icon"
                        >
                          <button
                            style={{
                              border: 0,
                              background: '#1f3b4f',
                              width: '100%',
                              height: '100%',
                              borderRadius: '7px',
                            }}
                            type="button"
                          >
                            <div
                              style={{ marginTop: 8 }}
                              className="flex flex-col jusity-center items-center gap-y-[10px]"
                            >
                              <img src="./token/icon-upload.svg" alt="upload" className="w-[30px] h-[30px]" />
                              <p className="font-OCR text-[10px] text-green leading-4">Upload Image</p>
                            </div>
                          </button>
                        </Upload>
                      </ImgCrop>
                    )
                  : !iconUrl && (
                      <div className="custom-upload-icon upload-no-address" onClick={handleNoWallet}>
                        <button
                          style={{
                            border: 0,
                            background: '#1f3b4f',
                            width: '100%',
                            height: '100%',
                            borderRadius: '7px',
                          }}
                          type="button"
                        >
                          <div
                            style={{ marginTop: 8 }}
                            className="flex flex-col jusity-center items-center gap-y-[10px]"
                          >
                            <img src="./token/icon-upload.svg" alt="upload" className="w-[30px] h-[30px]" />
                            <p className="font-OCR text-[10px] text-green leading-4">Upload Image</p>
                          </div>
                        </button>
                      </div>
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
              rules={[{ required: true, message: 'Please input description!' }]}
            >
              <Input.TextArea
                showCount
                maxLength={250}
                placeholder=""
                style={{ height: 208, resize: 'none' }}
                className="custom-create-textarea rounded-[7px]"
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
                <div className="flex items-end">
                  <p>
                    Pre-Launch Duration <span>*</span>
                  </p>
                  <p>
                    <ITooltip
                      placement="bottom"
                      toolClassName="create-tooltip"
                      title={`Choose a preparation period for community building and airdrop tasks before your Initial Memecoin Offering (IMO) begins. During the sale, participants can buy up to 0.2% of the token supply per wallet. The IMO concludes either when fully subscribed (66.6 SOL) or when the 24-hour window expires.`}
                      color="#fff"
                      bgColor="#4A5082"
                    />
                  </p>
                </div>
              }
              name="preLaunchDuration"
            >
              <Radio.Group options={PreLaunchDurationOptions} optionType="button" buttonStyle="solid" />
            </Form.Item>
            <Form.Item
              label={
                <div className="flex items-end">
                  <p>
                    Creator’s Allocation <span>*</span> <br />{' '}
                  </p>
                </div>
              }
            >
              <div className="bg-[#07E993] h-[50px] rounded-[7px] flex items-center justify-center text-[#A005FE] text-[24px] font-404px text-center">
                {creatorAllocation.toLocaleString('en-US', { useGrouping: true })}{' '}
                <span className="text-[18px]">&nbsp;TOKENS</span>
              </div>
            </Form.Item>
            <p className="create_tip_for_acquisition">
              Creator is entitled <br /> to {firstProportion * 100}% of token supply
            </p>
            <Form.Item
              label={
                <div className="flex items-end">
                  <p className="mr-[10px]">
                    Pre-Market Acquisition<span>*</span>
                  </p>
                  <p>
                    <ITooltip
                      placement="bottom"
                      title={`Creators can secure up to an additional ${maxProportion * 100}% of the meme token before the launch.`}
                      color="#fff"
                      bgColor="#4A5082"
                    />
                  </p>
                </div>
              }
              name="preMarketAcquisition"
              style={{ marginTop: '40px' }}
            >
              <MySlider
                defaultValue={preMarketAcquisition}
                min={0}
                max={maxProportion}
                // min={firstProportion}
                // max={100}
                minPrice={0}
                maxPrice={totalCapInitial}
              />
              {/* <MySlider min={0} max={1} minPrice={0} maxPrice={100} /> */}
            </Form.Item>
            <p className="create_tip_for_acquisition">
              {/* The creator can enhance the initial allocation by purchasing an additional {maxProportion * 100}% */}
              Creator can enhance the initial allocation by purchasing an additional {maxProportion * 100}%
            </p>

            <div className="create_optional_info">
              <div className="create_optional_info_title">
                <p className="font-404px text-[18px]">Optional Info</p>
                {optionalOpen ? (
                  <IconMinus
                    onClick={() => {
                      setOptionalOpen(!optionalOpen);
                    }}
                  />
                ) : (
                  <IconPlus
                    onClick={() => {
                      setOptionalOpen(!optionalOpen);
                    }}
                  />
                )}
              </div>
              {optionalOpen && (
                <div className="create_optional_form">
                  <Form.Item
                    label={
                      <p>
                        Upload <var>Project Banner</var>
                      </p>
                    }
                    valuePropName="bannerList"
                    getValueFromEvent={normFile}
                    name="banners"
                  >
                    <div className="token-banner-form-item">
                      {/* <Input style={{ display: 'none' }} /> */}
                      {address && bannerUrl && (
                        <div className="icon-url-container banner-url-container">
                          <img src={bannerUrl} alt="" />
                          <span className="icon-url-actions">
                            <Trash size={16} onClick={handleRemoveBanner} />
                          </span>
                        </div>
                      )}
                      {address ? (
                        !bannerUrl && (
                          <ImgCrop
                            // rotationSlider
                            modalClassName="memoo_modal memoo_upload"
                            // showReset
                            modalTitle=" "
                            resetText="reset"
                            modalOk="Save"
                            modalCancel="Cancel"
                            quality={1}
                            aspect={16 / 6}
                          >
                            <Upload
                              listType="picture-card"
                              accept="image/*"
                              maxCount={1}
                              beforeUpload={(file) => handleUpload(file, 'banners')}
                              showUploadList={{
                                showPreviewIcon: false,
                                showRemoveIcon: true,
                              }}
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
                                <div
                                  style={{ marginTop: 8 }}
                                  className="flex flex-col jusity-center items-center gap-y-[10px]"
                                >
                                  <img src="./token/icon-upload.svg" alt="upload" className="w-[30px] h-[30px]" />
                                  <p className="font-OCR text-[10px] text-green leading-4 text-center w-[158px]">
                                    Recommended 790px X 307px Max size: 10MB
                                  </p>
                                </div>
                              </button>
                            </Upload>
                          </ImgCrop>
                        )
                      ) : (
                        <div className="upload-no-address custom-upload-icon" onClick={handleNoWallet}>
                          <button
                            style={{
                              border: 0,
                              background: '#1f3b4f',
                              width: '100%',
                              height: '100%',
                              borderRadius: '7px',
                            }}
                            type="button"
                          >
                            <div
                              style={{ marginTop: 8 }}
                              className="flex flex-col jusity-center items-center gap-y-[10px]"
                            >
                              <img src="./token/icon-upload.svg" alt="upload" className="w-[30px] h-[30px]" />
                              <p className="font-OCR text-[10px] text-green leading-4 text-center w-[158px]">
                                Recommended 790px X 307px Max size: 10MB
                              </p>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  </Form.Item>
                  <Form.Item label={<p className="whitespace-pre-wrap">{`Project\nWebsite`}</p>} name="website">
                    <div className="reactive">
                      <Input className="custom-input rounded-[7px] px-8" />
                      <img className="website-logo" src="/create/icon-website.png" alt="" />
                    </div>
                  </Form.Item>
                  <Form.Item label={<p className="whitespace-pre-wrap">{`Project\nTelegram`}</p>} name="telegram">
                    <div className="reactive">
                      <Input className="custom-input rounded-[7px] px-8" />
                      <IconTelegram className="website-logo w-[17px] h-[15px]" hoverColor="#07E993" />
                    </div>
                  </Form.Item>
                  <Form.Item label={<p className="whitespace-pre-wrap">{`Project\nDiscord`}</p>} name="discord">
                    <div className="reactive">
                      <Input className="custom-input rounded-[7px] px-8" />
                      <IconDiscord className="website-logo w-[17px] h-[15px]" color="#07E993" hoverColor="#07E993" />
                    </div>
                  </Form.Item>
                  <Form.Item label={<p>Creator’s Twitter</p>} name="creatorTwitter">
                    <div className="flex items-center">
                      <img src="./token/icon-twitter.svg" className="w-4 h-4 mr-4" />
                      {createTwitter && <img src="./create/icon-authed.svg" />}
                      {!createTwitter && (
                        <Button variant="secondary" className="w-[136px] h-[32px]" onClick={connectCreatorTwitter}>
                          CONNECT
                        </Button>
                      )}
                    </div>
                  </Form.Item>
                  <Form.Item
                    label={<p className="whitespace-pre-wrap">{`Featured\nTweet links`}</p>}
                    name="pinnedTwitterUrl"
                  >
                    <div className="flex flex-col items-center gap-y-[15px]">
                      {pinnedTwitterUrl.map((data, index) => (
                        <Input
                          key={index}
                          className="custom-input rounded-[7px] px-8"
                          value={data}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                      ))}
                    </div>
                  </Form.Item>
                </div>
              )}
            </div>
          </Form>

          <div>
            <p className="create_fee_desc">
              A platform Fee of {totalCap} {tokenSymbol} is applicable to facilitate your meme token creation. You will{' '}
              <br /> be entitled to {firstProportion * 100}% supply of your meme token. The token will be distributed
              post <br /> TGE after <span className="text-[#07E993]">‘fair conditions’</span> are met.{' '}
              <span className="text-[#07E993]">Click here </span>
              for the tokenomics disclosures.
            </p>
          </div>
          <div>
            <Checkbox
              checked={isAccept}
              onChange={() => {
                console.log('isAccept: ', isAccept);
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
              {/* {invalidChain ? 'Switch Chain' : 'Confirm'} */}
              Confirm
            </Button>
            <CreatedTokenCompleteConnectedModal ref={createdTokenRef} data={form.getFieldsValue()} iconUrl={iconUrl} />
          </div>
        </div>
        <img src="./create/img-create-bg.png" alt="" className="create_token_bg" />
      </div>
      <div className="flex items-center mt-[76px] w-[100%] justify-center gap-[30px]">
        {CurrentProductDescriptions.map((item) => {
          return (
            <span className="text-[12px] text-[#07E993] font-OCR hover:text-[#B53BFF]" key={item}>
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}
