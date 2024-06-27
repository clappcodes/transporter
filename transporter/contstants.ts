import { colors } from "../utils.ts";

export const isDuplexHandler = Symbol("isDuplexHandler");

export enum METHOD {
  GET = "GET",
  HEAD = "HEAD",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  ANY = "*",
}

export const STREAM_ID_KEY = "stream-id";
export const STREAM_TYPE_KEY = "stream-type";
export enum STREAM_TYPE {
  OUTGOING = "OUTGOING",
  INCOMING = "INCOMING",
}

export const TransporterASCIILogo = "";
