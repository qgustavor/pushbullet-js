export interface DeviceParams {
  device_id?: number;
  device_iden?: string;
  email?: string;
  channel_tag?: string;
  client_iden?: string;
  source_device_iden?: string;
}

export interface PushOptions {
  active?: boolean;
  cursor?: string;
  limit?: number;
  modified_after?: number;
}

export interface ListOptions {
  active?: boolean;
  cursor?: string;
  limit?: number;
}

export interface ChannelOptions {
  tag: string;
  name: string;
  description?: string;
}

export interface DeviceOptions {
  nickname: string;
  model?: string;
  manufacturer?: string;
  push_token?: string;
  app_version?: number;
  icon?: string;
  has_sms?: boolean;
}

export interface ClipboardOptions {
  body: string;
  source_user_iden: string;
  source_device_iden: string;
}

export interface DismissalOptions {
  package_name: string;
  notification_id: string;
  notification_tag: string;
  source_user_iden: string;
}

export interface TextOptions {
  guid?: string;
  status?: string;
  file_type?: string;
  file_url?: string;
  skip_file_delete?: boolean;
}

export interface RequestOptions {
  qs?: Record<string, any>;
  json?: Record<string, any>;
}

export interface StreamData {
  type: string;
  subtype?: string;
  push?: any;
}
