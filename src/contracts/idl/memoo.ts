export type Memoo = {
  "version": "0.1.0",
  "name": "memoo",
  "constants": [
    {
      "name": "GLOBAL_MEMOO_CONFIG",
      "type": "string",
      "value": "\"global_memoo_config\""
    },
    {
      "name": "MEME_CONFIG",
      "type": "string",
      "value": "\"meme_config\""
    },
    {
      "name": "MEME_USER_DATA",
      "type": "string",
      "value": "\"meme_user_data\""
    },
    {
      "name": "PERCENT_DENOMINATOR",
      "type": "u64",
      "value": "10000"
    },
    {
      "name": "AUTHORITY_SEED",
      "type": "string",
      "value": "\"authority\""
    }
  ],
  "instructions": [
    {
      "name": "createMemooConfig",
      "accounts": [
        {
          "name": "memooConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The account paying for all rents"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Solana ecosystem accounts"
          ]
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "publicKey"
        },
        {
          "name": "platformFeeRecipient",
          "type": "publicKey"
        },
        {
          "name": "platformFeeRateIdo",
          "type": "u16"
        },
        {
          "name": "platformFeeRateDenominatorIdo",
          "type": "u16"
        },
        {
          "name": "idoCreatorBuyLimit",
          "type": "u16"
        },
        {
          "name": "tokenAllocationCreator",
          "type": "u16"
        },
        {
          "name": "tokenAllocationIdo",
          "type": "u16"
        },
        {
          "name": "tokenAllocationLp",
          "type": "u16"
        },
        {
          "name": "tokenAllocationAirdrop",
          "type": "u16"
        },
        {
          "name": "tokenAllocationPlatform",
          "type": "u16"
        },
        {
          "name": "idoUserBuyLimit",
          "type": "u16"
        },
        {
          "name": "idoPrice",
          "type": "u64"
        },
        {
          "name": "airdropPrice",
          "type": "u64"
        },
        {
          "name": "totalSupply",
          "type": "u128"
        },
        {
          "name": "platformFeeCreateMemeSol",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateMemooConfig",
      "accounts": [
        {
          "name": "memooConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true,
          "docs": [
            "The admin of the MemooConfig"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Solana ecosystem accounts"
          ]
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "publicKey"
        },
        {
          "name": "admin",
          "type": "publicKey"
        },
        {
          "name": "platformFeeRecipient",
          "type": "publicKey"
        },
        {
          "name": "platformFeeRateIdo",
          "type": "u16"
        },
        {
          "name": "platformFeeRateDenominatorIdo",
          "type": "u16"
        },
        {
          "name": "idoCreatorBuyLimit",
          "type": "u16"
        },
        {
          "name": "tokenAllocationCreator",
          "type": "u16"
        },
        {
          "name": "tokenAllocationIdo",
          "type": "u16"
        },
        {
          "name": "tokenAllocationLp",
          "type": "u16"
        },
        {
          "name": "tokenAllocationAirdrop",
          "type": "u16"
        },
        {
          "name": "tokenAllocationPlatform",
          "type": "u16"
        },
        {
          "name": "idoUserBuyLimit",
          "type": "u16"
        },
        {
          "name": "idoPrice",
          "type": "u64"
        },
        {
          "name": "airdropPrice",
          "type": "u64"
        },
        {
          "name": "totalSupply",
          "type": "u128"
        },
        {
          "name": "platformFeeCreateMemeSol",
          "type": "u64"
        }
      ]
    },
    {
      "name": "registerTokenMint",
      "accounts": [
        {
          "name": "memooConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "platformFeeRecipient",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "memeConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "memeUserData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The account paying for all rents"
          ]
        },
        {
          "name": "poolAuthorityWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAccountWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountWsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userSolAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userWsolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsolMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Solana ecosystem accounts"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        },
        {
          "name": "inputAmount",
          "type": "u64"
        },
        {
          "name": "preLaunchSecond",
          "type": "i64"
        }
      ]
    },
    {
      "name": "createTokenMint",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memeConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountA",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "poolAuthorityA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        },
        {
          "name": "tokenName",
          "type": "string"
        },
        {
          "name": "tokenSymbol",
          "type": "string"
        },
        {
          "name": "tokenUri",
          "type": "string"
        }
      ]
    },
    {
      "name": "idoBuy",
      "accounts": [
        {
          "name": "memooConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "memeConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "memeUserData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The account paying for all rents"
          ]
        },
        {
          "name": "poolAuthorityWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAccountWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userWsolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsolMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Solana ecosystem accounts"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        },
        {
          "name": "inputAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "idoEnd",
      "accounts": [
        {
          "name": "memooConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The admin of the MemooConfig"
          ]
        },
        {
          "name": "memeConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Solana ecosystem accounts"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "wrapSol",
      "accounts": [
        {
          "name": "userSolAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userWsolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsolMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "adminClaimWsol",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memooConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "memeConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "adminAccountWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthorityWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAccountWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountWsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "adminClaimToken",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memooConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "memeConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "adminAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolAuthorityA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "adminClaimFeeWsol",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memooConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "memeConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "platformFeeRecipient",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformFeeRecipientWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthorityWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAccountWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountWsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "creatorClaim",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memooConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "memeUserData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolAuthorityA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "creatorClaimPermission",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "memooConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "memeUserData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        },
        {
          "name": "count",
          "type": "u64"
        },
        {
          "name": "period",
          "type": "u64"
        }
      ]
    },
    {
      "name": "dealHunterClaim",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "memeConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "memeUserData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instructionsSysvar",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "idoClaim",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memeUserData",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "idoUserAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolAuthorityA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "memooConfigParam",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "docs": [
              "The primary key of the MemooConfig"
            ],
            "type": "publicKey"
          },
          {
            "name": "platformFeeRateIdo",
            "docs": [
              "1 of 1/7"
            ],
            "type": "u16"
          },
          {
            "name": "platformFeeRateDenominatorIdo",
            "docs": [
              "7 of 1/7"
            ],
            "type": "u16"
          },
          {
            "name": "platformFeeCreateMeme",
            "docs": [
              "the fee of create meme"
            ],
            "type": "u16"
          },
          {
            "name": "idoCreatorBuyLimit",
            "docs": [
              "3000"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationCreator",
            "docs": [
              "500"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationIdo",
            "docs": [
              "3500"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationLp",
            "docs": [
              "5500"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationAirdrop",
            "docs": [
              "200"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationPlatform",
            "docs": [
              "300"
            ],
            "type": "u16"
          },
          {
            "name": "idoPrice",
            "docs": [
              "idoPrice"
            ],
            "type": "u64"
          },
          {
            "name": "airdropPrice",
            "docs": [
              "idoPrice"
            ],
            "type": "u64"
          },
          {
            "name": "totalSupply",
            "docs": [
              "totalSupply"
            ],
            "type": "u64"
          },
          {
            "name": "idoUserBuyLimit",
            "docs": [
              "idoUserBuyLimit"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "globalMemooConfig",
      "docs": [
        "use update method to update"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "docs": [
              "The primary key of the MemooConfig"
            ],
            "type": "publicKey"
          },
          {
            "name": "admin",
            "docs": [
              "Account that has admin authority over the MemooConfig"
            ],
            "type": "publicKey"
          },
          {
            "name": "platformFeeRecipient",
            "docs": [
              "createFee, idoFee"
            ],
            "type": "publicKey"
          },
          {
            "name": "platformFeeRateIdo",
            "docs": [
              "1 - 1 of 1/7"
            ],
            "type": "u16"
          },
          {
            "name": "platformFeeRateDenominatorIdo",
            "docs": [
              "2 - 7 of 1/7"
            ],
            "type": "u16"
          },
          {
            "name": "idoCreatorBuyLimit",
            "docs": [
              "3 - 3000"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationCreator",
            "docs": [
              "4 - 500"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationIdo",
            "docs": [
              "5 - 3500"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationLp",
            "docs": [
              "6 - 5500"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationAirdrop",
            "docs": [
              "7 - 200"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationPlatform",
            "docs": [
              "8 - 300"
            ],
            "type": "u16"
          },
          {
            "name": "idoUserBuyLimit",
            "docs": [
              "9 -idoUserBuyLimit"
            ],
            "type": "u16"
          },
          {
            "name": "idoPrice",
            "docs": [
              "idoPrice"
            ],
            "type": "u64"
          },
          {
            "name": "airdropPrice",
            "docs": [
              "idoPrice"
            ],
            "type": "u64"
          },
          {
            "name": "platformFeeCreateMemeSol",
            "docs": [
              "10 - the fee of create meme"
            ],
            "type": "u64"
          },
          {
            "name": "openTime",
            "type": "i64"
          },
          {
            "name": "totalSupply",
            "docs": [
              "totalSupply",
              "340282366920938463463374607431768211455"
            ],
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "memeConfig",
      "docs": [
        "update many times"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "idoEnd",
            "docs": [
              "check ido_end"
            ],
            "type": "bool"
          },
          {
            "name": "isInitialized",
            "docs": [
              "init or check id"
            ],
            "type": "bool"
          },
          {
            "name": "id",
            "docs": [
              "The primary key of the Meme,"
            ],
            "type": "publicKey"
          },
          {
            "name": "admin",
            "docs": [
              "Account that has admin authority"
            ],
            "type": "publicKey"
          },
          {
            "name": "creator",
            "docs": [
              "Account of User"
            ],
            "type": "publicKey"
          },
          {
            "name": "creatorTotal",
            "docs": [
              "Creator lock total"
            ],
            "type": "u64"
          },
          {
            "name": "platformTotal",
            "docs": [
              "Platform lock total"
            ],
            "type": "u64"
          },
          {
            "name": "createTimestamp",
            "docs": [
              "Meme Create Timestamp"
            ],
            "type": "i64"
          },
          {
            "name": "preLaunchSecond",
            "docs": [
              "preLaunch Second"
            ],
            "type": "i64"
          },
          {
            "name": "memeIdoCount",
            "docs": [
              "ido count"
            ],
            "type": "u64"
          },
          {
            "name": "memeAirdropCount",
            "docs": [
              "airdrop count"
            ],
            "type": "u64"
          },
          {
            "name": "memeAirdropTotal",
            "docs": [
              "airdrop count"
            ],
            "type": "u64"
          },
          {
            "name": "memeIdoMoney",
            "docs": [
              "ido money"
            ],
            "type": "u64"
          },
          {
            "name": "totalSupply",
            "docs": [
              "totalSupply, may be samller than GlobalMemooConfig.total_supply"
            ],
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "memeUserIdoData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "docs": [
              "init or check id"
            ],
            "type": "bool"
          },
          {
            "name": "memeId",
            "docs": [
              "The primary key of the Meme, this is key"
            ],
            "type": "publicKey"
          },
          {
            "name": "user",
            "docs": [
              "Account of User, this is key"
            ],
            "type": "publicKey"
          },
          {
            "name": "memeUserIdoCount",
            "docs": [
              "ido buy count"
            ],
            "type": "u64"
          },
          {
            "name": "memeUserIdoClaimedCount",
            "docs": [
              "ido buy count"
            ],
            "type": "u64"
          },
          {
            "name": "memeUserIdoMoney",
            "docs": [
              "Spend money"
            ],
            "type": "u64"
          },
          {
            "name": "creatorLockCount",
            "docs": [
              "Creator lock total"
            ],
            "type": "u64"
          },
          {
            "name": "creatorLockCountPermission",
            "docs": [
              "Creator lock count_permission"
            ],
            "type": "u64"
          },
          {
            "name": "creatorLockPeriod",
            "docs": [
              "Creator lock period"
            ],
            "type": "u64"
          },
          {
            "name": "memeUserAirdropClaimedCount",
            "docs": [
              "ido buy count"
            ],
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "AirdropMessage",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "meme",
            "type": "publicKey"
          },
          {
            "name": "count",
            "type": "u64"
          },
          {
            "name": "expiry",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DeserializeAirdropMessageError",
      "msg": "Deserialize Airdrop Message Error"
    },
    {
      "code": 6001,
      "name": "PoolAuthorityAtaMissing",
      "msg": "Pool Authority Ata Missing"
    },
    {
      "code": 6002,
      "name": "PoolTokenAtaMissing",
      "msg": "Pool Token Ata Missing"
    },
    {
      "code": 6003,
      "name": "Expired",
      "msg": "Expired"
    },
    {
      "code": 6004,
      "name": "InvalidFee",
      "msg": "Invalid fee value"
    },
    {
      "code": 6005,
      "name": "InvalidTooMany",
      "msg": "Invalid buy too many tokens"
    },
    {
      "code": 6006,
      "name": "BalanceTooSmall",
      "msg": "Balance is below the input"
    },
    {
      "code": 6007,
      "name": "InputTooSmallThanFee",
      "msg": "Input too samll to pay fee"
    },
    {
      "code": 6008,
      "name": "InputTooSmallThanIdoPrice",
      "msg": "Input too samll to buy one unit"
    },
    {
      "code": 6009,
      "name": "IdoBuyExceedIdoTotal",
      "msg": "Ido Buy Exceed Ido Total"
    },
    {
      "code": 6010,
      "name": "IdoBuyExceedIdoCreatorBuyLimit",
      "msg": "Ido Buy Exceed Creator Buy Limit"
    },
    {
      "code": 6011,
      "name": "IdoBuyExceedIdoUserBuyLimit",
      "msg": "Ido Buy Exceed User Buy Limit"
    },
    {
      "code": 6012,
      "name": "PreLaunchSecondLt0",
      "msg": "PreLaunchSecond < 0"
    },
    {
      "code": 6013,
      "name": "AdminMismatch",
      "msg": "AdminMismatch"
    },
    {
      "code": 6014,
      "name": "MemeConfigIsNotInitialized",
      "msg": "Meme Config Is Not Initialized"
    },
    {
      "code": 6015,
      "name": "UserDataIsNotInitialized",
      "msg": "User Data Is Not Initialized"
    },
    {
      "code": 6016,
      "name": "MemeIDMismatch",
      "msg": "Meme ID Mismatch"
    },
    {
      "code": 6017,
      "name": "UserMismatch",
      "msg": "User Mismatch"
    },
    {
      "code": 6018,
      "name": "AirdropAlreadyClaimed",
      "msg": "Airdrop Already Claimed"
    },
    {
      "code": 6019,
      "name": "MemeConfigIsInitialized",
      "msg": "Meme Config Is Initialized"
    },
    {
      "code": 6020,
      "name": "CreatorClaimExceed",
      "msg": "Creator Claim Exceed"
    },
    {
      "code": 6021,
      "name": "CreatorClaimPermissionExceed",
      "msg": "Creator Claim Permission Exceed"
    },
    {
      "code": 6022,
      "name": "CreatorClaimPermissionSmalllerThanBefore",
      "msg": "Creator Claim Permission Smalller Than Before"
    },
    {
      "code": 6023,
      "name": "CreatorClaimPeriodSmalllerThanBefore",
      "msg": "Creator Claim Period Smalller Than Before"
    },
    {
      "code": 6024,
      "name": "IdoUserClaimExceed",
      "msg": "Creator Claim Exceed"
    },
    {
      "code": 6025,
      "name": "DealHunterClaimExceed",
      "msg": "Deal Hunter Claim Exceed"
    },
    {
      "code": 6026,
      "name": "NotAdminSignature",
      "msg": "Not Admin Signature"
    },
    {
      "code": 6027,
      "name": "VerifySignatureFail",
      "msg": "Verify Signature Fail"
    },
    {
      "code": 6028,
      "name": "MemeUserDataConfigIsInitialized",
      "msg": "Meme User Data Config Is Initialized"
    },
    {
      "code": 6029,
      "name": "MemeUserDataConfigIsNotInitialized",
      "msg": "Meme User Data Config Is Not Initialized"
    },
    {
      "code": 6030,
      "name": "MemeUserDataMemeIdOrUserMismatch",
      "msg": "Meme User Data Meme Id Or User Is Mismatch"
    },
    {
      "code": 6031,
      "name": "IdoNotStarted",
      "msg": "IDO not started"
    },
    {
      "code": 6032,
      "name": "IdoNotEnd",
      "msg": "IDO not end"
    },
    {
      "code": 6033,
      "name": "MemeIdoCountLt0",
      "msg": "IDO Ccount < 0"
    }
  ]
};

export const IDL: Memoo = {
  "version": "0.1.0",
  "name": "memoo",
  "constants": [
    {
      "name": "GLOBAL_MEMOO_CONFIG",
      "type": "string",
      "value": "\"global_memoo_config\""
    },
    {
      "name": "MEME_CONFIG",
      "type": "string",
      "value": "\"meme_config\""
    },
    {
      "name": "MEME_USER_DATA",
      "type": "string",
      "value": "\"meme_user_data\""
    },
    {
      "name": "PERCENT_DENOMINATOR",
      "type": "u64",
      "value": "10000"
    },
    {
      "name": "AUTHORITY_SEED",
      "type": "string",
      "value": "\"authority\""
    }
  ],
  "instructions": [
    {
      "name": "createMemooConfig",
      "accounts": [
        {
          "name": "memooConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The account paying for all rents"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Solana ecosystem accounts"
          ]
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "publicKey"
        },
        {
          "name": "platformFeeRecipient",
          "type": "publicKey"
        },
        {
          "name": "platformFeeRateIdo",
          "type": "u16"
        },
        {
          "name": "platformFeeRateDenominatorIdo",
          "type": "u16"
        },
        {
          "name": "idoCreatorBuyLimit",
          "type": "u16"
        },
        {
          "name": "tokenAllocationCreator",
          "type": "u16"
        },
        {
          "name": "tokenAllocationIdo",
          "type": "u16"
        },
        {
          "name": "tokenAllocationLp",
          "type": "u16"
        },
        {
          "name": "tokenAllocationAirdrop",
          "type": "u16"
        },
        {
          "name": "tokenAllocationPlatform",
          "type": "u16"
        },
        {
          "name": "idoUserBuyLimit",
          "type": "u16"
        },
        {
          "name": "idoPrice",
          "type": "u64"
        },
        {
          "name": "airdropPrice",
          "type": "u64"
        },
        {
          "name": "totalSupply",
          "type": "u128"
        },
        {
          "name": "platformFeeCreateMemeSol",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateMemooConfig",
      "accounts": [
        {
          "name": "memooConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true,
          "docs": [
            "The admin of the MemooConfig"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Solana ecosystem accounts"
          ]
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "publicKey"
        },
        {
          "name": "admin",
          "type": "publicKey"
        },
        {
          "name": "platformFeeRecipient",
          "type": "publicKey"
        },
        {
          "name": "platformFeeRateIdo",
          "type": "u16"
        },
        {
          "name": "platformFeeRateDenominatorIdo",
          "type": "u16"
        },
        {
          "name": "idoCreatorBuyLimit",
          "type": "u16"
        },
        {
          "name": "tokenAllocationCreator",
          "type": "u16"
        },
        {
          "name": "tokenAllocationIdo",
          "type": "u16"
        },
        {
          "name": "tokenAllocationLp",
          "type": "u16"
        },
        {
          "name": "tokenAllocationAirdrop",
          "type": "u16"
        },
        {
          "name": "tokenAllocationPlatform",
          "type": "u16"
        },
        {
          "name": "idoUserBuyLimit",
          "type": "u16"
        },
        {
          "name": "idoPrice",
          "type": "u64"
        },
        {
          "name": "airdropPrice",
          "type": "u64"
        },
        {
          "name": "totalSupply",
          "type": "u128"
        },
        {
          "name": "platformFeeCreateMemeSol",
          "type": "u64"
        }
      ]
    },
    {
      "name": "registerTokenMint",
      "accounts": [
        {
          "name": "memooConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "platformFeeRecipient",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "memeConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "memeUserData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The account paying for all rents"
          ]
        },
        {
          "name": "poolAuthorityWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAccountWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountWsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userSolAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userWsolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsolMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Solana ecosystem accounts"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        },
        {
          "name": "inputAmount",
          "type": "u64"
        },
        {
          "name": "preLaunchSecond",
          "type": "i64"
        }
      ]
    },
    {
      "name": "createTokenMint",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memeConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountA",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "poolAuthorityA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        },
        {
          "name": "tokenName",
          "type": "string"
        },
        {
          "name": "tokenSymbol",
          "type": "string"
        },
        {
          "name": "tokenUri",
          "type": "string"
        }
      ]
    },
    {
      "name": "idoBuy",
      "accounts": [
        {
          "name": "memooConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "memeConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "memeUserData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The account paying for all rents"
          ]
        },
        {
          "name": "poolAuthorityWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAccountWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userWsolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsolMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Solana ecosystem accounts"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        },
        {
          "name": "inputAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "idoEnd",
      "accounts": [
        {
          "name": "memooConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The admin of the MemooConfig"
          ]
        },
        {
          "name": "memeConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Solana ecosystem accounts"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "wrapSol",
      "accounts": [
        {
          "name": "userSolAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userWsolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsolMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "adminClaimWsol",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memooConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "memeConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "adminAccountWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthorityWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAccountWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountWsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "adminClaimToken",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memooConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "memeConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "adminAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolAuthorityA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "adminClaimFeeWsol",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memooConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "memeConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "platformFeeRecipient",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformFeeRecipientWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAuthorityWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAccountWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountWsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "creatorClaim",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memooConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "memeUserData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolAuthorityA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "creatorClaimPermission",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "memooConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "memeUserData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        },
        {
          "name": "count",
          "type": "u64"
        },
        {
          "name": "period",
          "type": "u64"
        }
      ]
    },
    {
      "name": "dealHunterClaim",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "memeConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "memeUserData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instructionsSysvar",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "idoClaim",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memeUserData",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "idoUserAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolAuthorityA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memeId",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "memooConfigParam",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "docs": [
              "The primary key of the MemooConfig"
            ],
            "type": "publicKey"
          },
          {
            "name": "platformFeeRateIdo",
            "docs": [
              "1 of 1/7"
            ],
            "type": "u16"
          },
          {
            "name": "platformFeeRateDenominatorIdo",
            "docs": [
              "7 of 1/7"
            ],
            "type": "u16"
          },
          {
            "name": "platformFeeCreateMeme",
            "docs": [
              "the fee of create meme"
            ],
            "type": "u16"
          },
          {
            "name": "idoCreatorBuyLimit",
            "docs": [
              "3000"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationCreator",
            "docs": [
              "500"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationIdo",
            "docs": [
              "3500"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationLp",
            "docs": [
              "5500"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationAirdrop",
            "docs": [
              "200"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationPlatform",
            "docs": [
              "300"
            ],
            "type": "u16"
          },
          {
            "name": "idoPrice",
            "docs": [
              "idoPrice"
            ],
            "type": "u64"
          },
          {
            "name": "airdropPrice",
            "docs": [
              "idoPrice"
            ],
            "type": "u64"
          },
          {
            "name": "totalSupply",
            "docs": [
              "totalSupply"
            ],
            "type": "u64"
          },
          {
            "name": "idoUserBuyLimit",
            "docs": [
              "idoUserBuyLimit"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "globalMemooConfig",
      "docs": [
        "use update method to update"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "docs": [
              "The primary key of the MemooConfig"
            ],
            "type": "publicKey"
          },
          {
            "name": "admin",
            "docs": [
              "Account that has admin authority over the MemooConfig"
            ],
            "type": "publicKey"
          },
          {
            "name": "platformFeeRecipient",
            "docs": [
              "createFee, idoFee"
            ],
            "type": "publicKey"
          },
          {
            "name": "platformFeeRateIdo",
            "docs": [
              "1 - 1 of 1/7"
            ],
            "type": "u16"
          },
          {
            "name": "platformFeeRateDenominatorIdo",
            "docs": [
              "2 - 7 of 1/7"
            ],
            "type": "u16"
          },
          {
            "name": "idoCreatorBuyLimit",
            "docs": [
              "3 - 3000"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationCreator",
            "docs": [
              "4 - 500"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationIdo",
            "docs": [
              "5 - 3500"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationLp",
            "docs": [
              "6 - 5500"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationAirdrop",
            "docs": [
              "7 - 200"
            ],
            "type": "u16"
          },
          {
            "name": "tokenAllocationPlatform",
            "docs": [
              "8 - 300"
            ],
            "type": "u16"
          },
          {
            "name": "idoUserBuyLimit",
            "docs": [
              "9 -idoUserBuyLimit"
            ],
            "type": "u16"
          },
          {
            "name": "idoPrice",
            "docs": [
              "idoPrice"
            ],
            "type": "u64"
          },
          {
            "name": "airdropPrice",
            "docs": [
              "idoPrice"
            ],
            "type": "u64"
          },
          {
            "name": "platformFeeCreateMemeSol",
            "docs": [
              "10 - the fee of create meme"
            ],
            "type": "u64"
          },
          {
            "name": "openTime",
            "type": "i64"
          },
          {
            "name": "totalSupply",
            "docs": [
              "totalSupply",
              "340282366920938463463374607431768211455"
            ],
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "memeConfig",
      "docs": [
        "update many times"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "idoEnd",
            "docs": [
              "check ido_end"
            ],
            "type": "bool"
          },
          {
            "name": "isInitialized",
            "docs": [
              "init or check id"
            ],
            "type": "bool"
          },
          {
            "name": "id",
            "docs": [
              "The primary key of the Meme,"
            ],
            "type": "publicKey"
          },
          {
            "name": "admin",
            "docs": [
              "Account that has admin authority"
            ],
            "type": "publicKey"
          },
          {
            "name": "creator",
            "docs": [
              "Account of User"
            ],
            "type": "publicKey"
          },
          {
            "name": "creatorTotal",
            "docs": [
              "Creator lock total"
            ],
            "type": "u64"
          },
          {
            "name": "platformTotal",
            "docs": [
              "Platform lock total"
            ],
            "type": "u64"
          },
          {
            "name": "createTimestamp",
            "docs": [
              "Meme Create Timestamp"
            ],
            "type": "i64"
          },
          {
            "name": "preLaunchSecond",
            "docs": [
              "preLaunch Second"
            ],
            "type": "i64"
          },
          {
            "name": "memeIdoCount",
            "docs": [
              "ido count"
            ],
            "type": "u64"
          },
          {
            "name": "memeAirdropCount",
            "docs": [
              "airdrop count"
            ],
            "type": "u64"
          },
          {
            "name": "memeAirdropTotal",
            "docs": [
              "airdrop count"
            ],
            "type": "u64"
          },
          {
            "name": "memeIdoMoney",
            "docs": [
              "ido money"
            ],
            "type": "u64"
          },
          {
            "name": "totalSupply",
            "docs": [
              "totalSupply, may be samller than GlobalMemooConfig.total_supply"
            ],
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "memeUserIdoData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "docs": [
              "init or check id"
            ],
            "type": "bool"
          },
          {
            "name": "memeId",
            "docs": [
              "The primary key of the Meme, this is key"
            ],
            "type": "publicKey"
          },
          {
            "name": "user",
            "docs": [
              "Account of User, this is key"
            ],
            "type": "publicKey"
          },
          {
            "name": "memeUserIdoCount",
            "docs": [
              "ido buy count"
            ],
            "type": "u64"
          },
          {
            "name": "memeUserIdoClaimedCount",
            "docs": [
              "ido buy count"
            ],
            "type": "u64"
          },
          {
            "name": "memeUserIdoMoney",
            "docs": [
              "Spend money"
            ],
            "type": "u64"
          },
          {
            "name": "creatorLockCount",
            "docs": [
              "Creator lock total"
            ],
            "type": "u64"
          },
          {
            "name": "creatorLockCountPermission",
            "docs": [
              "Creator lock count_permission"
            ],
            "type": "u64"
          },
          {
            "name": "creatorLockPeriod",
            "docs": [
              "Creator lock period"
            ],
            "type": "u64"
          },
          {
            "name": "memeUserAirdropClaimedCount",
            "docs": [
              "ido buy count"
            ],
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "AirdropMessage",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "meme",
            "type": "publicKey"
          },
          {
            "name": "count",
            "type": "u64"
          },
          {
            "name": "expiry",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DeserializeAirdropMessageError",
      "msg": "Deserialize Airdrop Message Error"
    },
    {
      "code": 6001,
      "name": "PoolAuthorityAtaMissing",
      "msg": "Pool Authority Ata Missing"
    },
    {
      "code": 6002,
      "name": "PoolTokenAtaMissing",
      "msg": "Pool Token Ata Missing"
    },
    {
      "code": 6003,
      "name": "Expired",
      "msg": "Expired"
    },
    {
      "code": 6004,
      "name": "InvalidFee",
      "msg": "Invalid fee value"
    },
    {
      "code": 6005,
      "name": "InvalidTooMany",
      "msg": "Invalid buy too many tokens"
    },
    {
      "code": 6006,
      "name": "BalanceTooSmall",
      "msg": "Balance is below the input"
    },
    {
      "code": 6007,
      "name": "InputTooSmallThanFee",
      "msg": "Input too samll to pay fee"
    },
    {
      "code": 6008,
      "name": "InputTooSmallThanIdoPrice",
      "msg": "Input too samll to buy one unit"
    },
    {
      "code": 6009,
      "name": "IdoBuyExceedIdoTotal",
      "msg": "Ido Buy Exceed Ido Total"
    },
    {
      "code": 6010,
      "name": "IdoBuyExceedIdoCreatorBuyLimit",
      "msg": "Ido Buy Exceed Creator Buy Limit"
    },
    {
      "code": 6011,
      "name": "IdoBuyExceedIdoUserBuyLimit",
      "msg": "Ido Buy Exceed User Buy Limit"
    },
    {
      "code": 6012,
      "name": "PreLaunchSecondLt0",
      "msg": "PreLaunchSecond < 0"
    },
    {
      "code": 6013,
      "name": "AdminMismatch",
      "msg": "AdminMismatch"
    },
    {
      "code": 6014,
      "name": "MemeConfigIsNotInitialized",
      "msg": "Meme Config Is Not Initialized"
    },
    {
      "code": 6015,
      "name": "UserDataIsNotInitialized",
      "msg": "User Data Is Not Initialized"
    },
    {
      "code": 6016,
      "name": "MemeIDMismatch",
      "msg": "Meme ID Mismatch"
    },
    {
      "code": 6017,
      "name": "UserMismatch",
      "msg": "User Mismatch"
    },
    {
      "code": 6018,
      "name": "AirdropAlreadyClaimed",
      "msg": "Airdrop Already Claimed"
    },
    {
      "code": 6019,
      "name": "MemeConfigIsInitialized",
      "msg": "Meme Config Is Initialized"
    },
    {
      "code": 6020,
      "name": "CreatorClaimExceed",
      "msg": "Creator Claim Exceed"
    },
    {
      "code": 6021,
      "name": "CreatorClaimPermissionExceed",
      "msg": "Creator Claim Permission Exceed"
    },
    {
      "code": 6022,
      "name": "CreatorClaimPermissionSmalllerThanBefore",
      "msg": "Creator Claim Permission Smalller Than Before"
    },
    {
      "code": 6023,
      "name": "CreatorClaimPeriodSmalllerThanBefore",
      "msg": "Creator Claim Period Smalller Than Before"
    },
    {
      "code": 6024,
      "name": "IdoUserClaimExceed",
      "msg": "Creator Claim Exceed"
    },
    {
      "code": 6025,
      "name": "DealHunterClaimExceed",
      "msg": "Deal Hunter Claim Exceed"
    },
    {
      "code": 6026,
      "name": "NotAdminSignature",
      "msg": "Not Admin Signature"
    },
    {
      "code": 6027,
      "name": "VerifySignatureFail",
      "msg": "Verify Signature Fail"
    },
    {
      "code": 6028,
      "name": "MemeUserDataConfigIsInitialized",
      "msg": "Meme User Data Config Is Initialized"
    },
    {
      "code": 6029,
      "name": "MemeUserDataConfigIsNotInitialized",
      "msg": "Meme User Data Config Is Not Initialized"
    },
    {
      "code": 6030,
      "name": "MemeUserDataMemeIdOrUserMismatch",
      "msg": "Meme User Data Meme Id Or User Is Mismatch"
    },
    {
      "code": 6031,
      "name": "IdoNotStarted",
      "msg": "IDO not started"
    },
    {
      "code": 6032,
      "name": "IdoNotEnd",
      "msg": "IDO not end"
    },
    {
      "code": 6033,
      "name": "MemeIdoCountLt0",
      "msg": "IDO Ccount < 0"
    }
  ]
};
