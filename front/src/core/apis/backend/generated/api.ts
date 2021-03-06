/* tslint:disable */
/* eslint-disable */
/**
 * Api documentation
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Configuration } from "./configuration";
import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";
// Some imports not used depending on template conditions
// @ts-ignore
import {
	assertParamExists,
	createRequestFunction,
	DUMMY_BASE_URL,
	serializeDataIfNeeded,
	setApiKeyToObject,
	setBasicAuthToObject,
	setBearerAuthToObject,
	setOAuthToObject,
	setSearchParams,
	toPathString,
} from "./common";
// @ts-ignore
import { BASE_PATH, BaseAPI, COLLECTION_FORMATS, RequestArgs, RequiredError } from "./base";

/**
 *
 * @export
 * @interface Entry
 */
export interface Entry {
	/**
	 *
	 * @type {string}
	 * @memberof Entry
	 */
	address: string;
	/**
	 *
	 * @type {string}
	 * @memberof Entry
	 */
	ip: string;
}

/**
 *
 * @export
 * @interface InlineObject
 */
export interface InlineObject {
	/**
	 *
	 * @type {string}
	 * @memberof InlineObject
	 */
	ip?: string;
	/**
	 *
	 * @type {string}
	 * @memberof InlineObject
	 */
	address?: string;
}

/**
 * DnsApi - axios parameter creator
 * @export
 */
export const DnsApiAxiosParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 *
		 * @param {Entry} entry
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		addEntry: async (entry: Entry, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
			// verify required parameter 'entry' is not null or undefined
			assertParamExists("addEntry", "entry", entry);
			const localVarPath = `/api/dns/entries`;
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarHeaderParameter["Content-Type"] = "application/json";

			setSearchParams(localVarUrlObj, localVarQueryParameter);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
			localVarRequestOptions.data = serializeDataIfNeeded(entry, localVarRequestOptions, configuration);

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
		/**
		 *
		 * @param {InlineObject} [inlineObject]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		deleteEntry: async (inlineObject?: InlineObject, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
			const localVarPath = `/api/dns/entries`;
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarHeaderParameter["Content-Type"] = "application/json";

			setSearchParams(localVarUrlObj, localVarQueryParameter);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
			localVarRequestOptions.data = serializeDataIfNeeded(inlineObject, localVarRequestOptions, configuration);

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
		/**
		 *
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		get: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
			const localVarPath = `/api/dns/entries`;
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			setSearchParams(localVarUrlObj, localVarQueryParameter);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
	};
};

/**
 * DnsApi - functional programming interface
 * @export
 */
export const DnsApiFp = function (configuration?: Configuration) {
	const localVarAxiosParamCreator = DnsApiAxiosParamCreator(configuration);
	return {
		/**
		 *
		 * @param {Entry} entry
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async addEntry(entry: Entry, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.addEntry(entry, options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
		/**
		 *
		 * @param {InlineObject} [inlineObject]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async deleteEntry(inlineObject?: InlineObject, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.deleteEntry(inlineObject, options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
		/**
		 *
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async get(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Entry>>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.get(options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
	};
};

/**
 * DnsApi - factory interface
 * @export
 */
export const DnsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
	const localVarFp = DnsApiFp(configuration);
	return {
		/**
		 *
		 * @param {Entry} entry
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		addEntry(entry: Entry, options?: any): AxiosPromise<void> {
			return localVarFp.addEntry(entry, options).then((request) => request(axios, basePath));
		},
		/**
		 *
		 * @param {InlineObject} [inlineObject]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		deleteEntry(inlineObject?: InlineObject, options?: any): AxiosPromise<void> {
			return localVarFp.deleteEntry(inlineObject, options).then((request) => request(axios, basePath));
		},
		/**
		 *
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		get(options?: any): AxiosPromise<Array<Entry>> {
			return localVarFp.get(options).then((request) => request(axios, basePath));
		},
	};
};

/**
 * DnsApi - object-oriented interface
 * @export
 * @class DnsApi
 * @extends {BaseAPI}
 */
export class DnsApi extends BaseAPI {
	/**
	 *
	 * @param {Entry} entry
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof DnsApi
	 */
	public addEntry(entry: Entry, options?: AxiosRequestConfig) {
		return DnsApiFp(this.configuration)
			.addEntry(entry, options)
			.then((request) => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {InlineObject} [inlineObject]
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof DnsApi
	 */
	public deleteEntry(inlineObject?: InlineObject, options?: AxiosRequestConfig) {
		return DnsApiFp(this.configuration)
			.deleteEntry(inlineObject, options)
			.then((request) => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof DnsApi
	 */
	public get(options?: AxiosRequestConfig) {
		return DnsApiFp(this.configuration)
			.get(options)
			.then((request) => request(this.axios, this.basePath));
	}
}
