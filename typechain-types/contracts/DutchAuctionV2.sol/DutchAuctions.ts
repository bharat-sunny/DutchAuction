/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface DutchAuctionsInterface extends utils.Interface {
  functions: {
    "erc20TokenAddress()": FunctionFragment;
    "erc721TokenAddress()": FunctionFragment;
    "finalize()": FunctionFragment;
    "nftTokenId()": FunctionFragment;
    "nop()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "erc20TokenAddress"
      | "erc721TokenAddress"
      | "finalize"
      | "nftTokenId"
      | "nop"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "erc20TokenAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "erc721TokenAddress",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "finalize", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "nftTokenId",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "nop", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "erc20TokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc721TokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "finalize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nftTokenId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nop", data: BytesLike): Result;

  events: {};
}

export interface DutchAuctions extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DutchAuctionsInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    erc20TokenAddress(overrides?: CallOverrides): Promise<[string]>;

    erc721TokenAddress(overrides?: CallOverrides): Promise<[string]>;

    finalize(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nftTokenId(overrides?: CallOverrides): Promise<[BigNumber]>;

    nop(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  erc20TokenAddress(overrides?: CallOverrides): Promise<string>;

  erc721TokenAddress(overrides?: CallOverrides): Promise<string>;

  finalize(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nftTokenId(overrides?: CallOverrides): Promise<BigNumber>;

  nop(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    erc20TokenAddress(overrides?: CallOverrides): Promise<string>;

    erc721TokenAddress(overrides?: CallOverrides): Promise<string>;

    finalize(overrides?: CallOverrides): Promise<void>;

    nftTokenId(overrides?: CallOverrides): Promise<BigNumber>;

    nop(overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    erc20TokenAddress(overrides?: CallOverrides): Promise<BigNumber>;

    erc721TokenAddress(overrides?: CallOverrides): Promise<BigNumber>;

    finalize(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nftTokenId(overrides?: CallOverrides): Promise<BigNumber>;

    nop(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    erc20TokenAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    erc721TokenAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    finalize(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nftTokenId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nop(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
