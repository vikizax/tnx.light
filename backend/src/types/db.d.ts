import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, bigint | number | string, bigint | number | string>;

export type Json = ColumnType<JsonValue, string, string>;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Ruletypes = "BOOLEAN" | "DATE" | "NUMBER" | "STRING" | "TIMESTAMP";

export type StatusType = "FAILED" | "RUNNING" | "SUBMITTED" | "SUCCESS";

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface DATASTEROIDAPIKeys {
  created_at: Generated<Timestamp>;
  created_by: Int8;
  exp: Timestamp | null;
  id: Generated<Int8>;
  scope: Json;
  token_id: string;
  token_name: string;
}

export interface DATASTEROIDAuthentication {
  created_at: Generated<Timestamp>;
  hashed_password: string;
  id: Generated<Int8>;
  salt: string;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDAvailableConnectors {
  connection_type: string;
  connector_name: string;
  db_type: string;
  id: Generated<Int8>;
  ui_layout: Json;
  writable: Generated<boolean>;
}

export interface DATASTEROIDCharts {
  created_at: Generated<Timestamp>;
  dashboard_id: Int8;
  graph_config: Json;
  id: Generated<Int8>;
  name: string;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDConnections {
  available_connector_id: number | null;
  connection_name: string;
  connection_status: string;
  connection_string: string | null;
  connection_type: string;
  created_at: Generated<Timestamp>;
  id: Generated<Int8>;
  last_sync: Timestamp;
  long_desc: string | null;
  updated_at: Generated<Timestamp>;
  user_id: number;
}

export interface DATASTEROIDConnectionSchemas {
  connection_id: number;
  created_at: Generated<Timestamp>;
  id: Generated<Int8>;
  is_auto_generated: Generated<boolean | null>;
  long_desc: string | null;
  schema_name: string;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDConnectionSchemasLabelMapping {
  connection_schema_id: number;
  created_at: Generated<Timestamp>;
  id: Generated<Int8>;
  label_id: number;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDConnectionsLabelMapping {
  connection_id: number;
  created_at: Generated<Timestamp>;
  id: Generated<Int8>;
  label_id: number;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDConnectionTableColumnsLabelMapping {
  connection_table_column_id: number;
  created_at: Generated<Timestamp>;
  id: Generated<Int8>;
  label_id: number;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDConnectionTables {
  connection_id: number;
  created_at: Generated<Timestamp>;
  fully_qualified_name: string;
  id: Generated<Int8>;
  long_desc: string | null;
  schema_id: number;
  table_name: string;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDConnectionTablesLabelMapping {
  connection_table_id: number;
  created_at: Generated<Timestamp>;
  id: Generated<Int8>;
  label_id: number;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDConnectorProfilingSupport {
  column_size: Generated<boolean>;
  connection_size: Generated<boolean>;
  connector_id: Int8;
  id: Generated<Int8>;
  schema_size: Generated<boolean>;
  table_size: Generated<boolean>;
  vendor_information_schema: Generated<boolean>;
}

export interface DATASTEROIDCubeJobsMetadata {
  cube_creation_end_time: Timestamp | null;
  cube_creation_start_time: Timestamp | null;
  dashboard_id: Int8;
  id: Generated<Int8>;
  job_id: string | null;
  time_of_submission: Timestamp | null;
}

export interface DATASTEROIDDashboardCubeMapping {
  created_at: Generated<Timestamp>;
  cube_id: string | null;
  dashboard_id: Int8;
  destination_schema: string;
  destination_table: string;
  id: Generated<Int8>;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDDashboardRelation {
  created_at: Generated<Timestamp>;
  dst_table_id: Int8;
  id: Generated<Int8>;
  related_columns: Json;
  src_table_id: Int8;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDDashboards {
  created_at: Generated<Timestamp>;
  dashboard_config: Json;
  id: Generated<Int8>;
  name: string;
  status: Generated<StatusType>;
  thumbnail_url: string;
  updated_at: Generated<Timestamp>;
  user_id: number;
}

export interface DATASTEROIDDashboardTables {
  created_at: Generated<Timestamp>;
  cube_id: string | null;
  dashboard_id: Int8;
  id: Generated<Int8>;
  table_id: Int8;
  table_name: string;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDDatabases {
  connector_id: number;
  created_at: Generated<Timestamp>;
  database_name: string;
  id: Generated<Int8>;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDDataEnrichmentRules {
  data_type: Ruletypes;
  id: Generated<Int8>;
  multivalue_input: boolean;
  requires_input: boolean;
  rule_type: string;
}

export interface DATASTEROIDDatasetLabelMapping {
  created_at: Generated<Timestamp>;
  dataset_id: number;
  id: Generated<Int8>;
  label_id: number;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDDatasets {
  created_at: Generated<Timestamp>;
  description: string | null;
  id: Generated<Int8>;
  long_desc: string | null;
  name: string;
  tags: Json | null;
  updated_at: Generated<Timestamp>;
  user_id: number;
}

export interface DATASTEROIDDatasetTables {
  created_at: Generated<Timestamp>;
  dataset_id: number;
  id: Generated<Int8>;
  table_id: number;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDDatasetTablesColumns {
  created_at: Generated<Timestamp>;
  dataset_table_id: Int8;
  id: Generated<Int8>;
  selected_column_id: Int8;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDDestinationTables {
  connection_id: number;
  created_at: Generated<Timestamp>;
  id: Generated<Int8>;
  pipe_id: number | null;
  schema_id: number;
  table_name: string;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDEnvironment {
  created_at: Generated<Timestamp>;
  created_by: Int8;
  description: string | null;
  env_name: string;
  id: Generated<Int8>;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDEnvironmentData {
  created_at: Generated<Timestamp>;
  display_value: Generated<string | null>;
  env_id: Int8;
  id: Generated<Int8>;
  isSecret: Generated<boolean>;
  key: string;
  updated_at: Generated<Timestamp>;
  value: string;
}

export interface DATASTEROIDLabels {
  color: string;
  created_at: Generated<Timestamp>;
  description: string | null;
  id: Generated<Int8>;
  name: string;
  updated_at: Generated<Timestamp>;
  user_id: number;
}

export interface DATASTEROIDPipeDAG {
  id: Generated<Int8>;
  node_data: Json;
  node_uuid: string;
  pipe_id: Generated<Int8>;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDPipes {
  active_qp_id: Int8 | null;
  created_at: Generated<Timestamp>;
  created_by: Int8 | null;
  dag_flow: Json | null;
  dag_svg: Generated<string | null>;
  id: Generated<Int8>;
  is_valid: Generated<boolean | null>;
  last_run: Timestamp | null;
  name: string;
  project_id: number;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDPipeTriggerEvents {
  created_at: Generated<Timestamp | null>;
  event: Generated<Json | null>;
  id: Generated<Int8>;
  kind: string | null;
  pipe_trigger_queue_id: Int8;
  status: string | null;
}

export interface DATASTEROIDPipeTriggerMetrics {
  cpu_usage: number | null;
  created_at: Generated<Timestamp | null>;
  id: Generated<Int8>;
  memory_usgae: Int8 | null;
  node_uuid: string | null;
  pipe_trigger_queue_id: Generated<Int8>;
  stage: string | null;
}

export interface DATASTEROIDPipeTriggers {
  created_at: Generated<Timestamp>;
  error_message: string | null;
  id: Generated<Int8>;
  pipe_id: number;
  status: string;
  trigger_time: Timestamp | null;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDPipeTriggersQueue {
  deferred_id: Int8 | null;
  id: Generated<Int8>;
  pipe_id: Int8;
  process_end_time: Timestamp | null;
  process_start_time: Timestamp | null;
  qp_id: Int8;
  qp_ver_id: Int8;
  queue_time: Generated<Timestamp | null>;
  retry_count: Generated<number | null>;
  should_be_batched: Generated<boolean | null>;
  status: Generated<string | null>;
}

export interface DATASTEROIDProjectLabelMapping {
  created_at: Generated<Timestamp>;
  id: Generated<Int8>;
  label_id: number;
  project_id: number;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDProjects {
  created_at: Generated<Timestamp>;
  description: string | null;
  id: Generated<Int8>;
  long_desc: string | null;
  name: string;
  tags: Json | null;
  updated_at: Generated<Timestamp>;
  user_id: number;
}

export interface DATASTEROIDProjectsDatasetsMapping {
  created_at: Generated<Timestamp>;
  dataset_id: number;
  id: Generated<Int8>;
  project_id: number;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDProjectsPipesMapping {
  created_at: Generated<Timestamp>;
  id: Generated<Int8>;
  pipe_id: number;
  project_id: number;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDPublicTokens {
  created_at: Generated<Timestamp>;
  created_by: Int8;
  expiry: Timestamp;
  id: Generated<Int8>;
  metadata: Json | null;
  name: string | null;
}

export interface DATASTEROIDQueryPlan {
  active_qpv_id: Int8 | null;
  created_at: Generated<Timestamp | null>;
  created_by: Int8 | null;
  id: Generated<Int8>;
  is_expired: boolean | null;
  pipe_id: Int8;
  type: string;
}

export interface DATASTEROIDQueryPlanDAGNodes {
  id: Generated<Int8>;
  node_data: Generated<Json | null>;
  node_uuid: string;
  qp_id: Int8;
  updated_at: Generated<Timestamp | null>;
}

export interface DATASTEROIDQueryPlanResourceAllocation {
  id: Generated<Int8>;
  qp_ver_id: Int8;
  resource_allocation_object: Generated<Json | null>;
  spark_config: Generated<Json | null>;
}

export interface DATASTEROIDQueryPlanVersion {
  created_at: Generated<Timestamp | null>;
  created_by: Int8 | null;
  dag_flow: Generated<Json | null>;
  dag_ui: Generated<Json | null>;
  id: Generated<Int8>;
  is_valid: Generated<boolean | null>;
  qp_id: Int8;
  rank: number | null;
  updated_at: Generated<Timestamp | null>;
}

export interface DATASTEROIDQueryPlanVersionDeltas {
  id: Generated<Int8>;
  node_data: Generated<Json | null>;
  node_uuid: string;
  operation: string;
  qp_ver_id: Int8;
  updated_at: Generated<Timestamp | null>;
}

export interface DATASTEROIDRole {
  created_at: Generated<Timestamp>;
  delete: Generated<boolean>;
  id: Generated<Int8>;
  name: string;
  read: Generated<boolean>;
  update: Generated<boolean>;
  updated_at: Generated<Timestamp>;
  write: Generated<boolean>;
}

export interface DATASTEROIDRoles {
  created_at: Generated<Timestamp>;
  id: number;
  role_id: number;
  updated_at: Generated<Timestamp>;
  user_id: number;
}

export interface DATASTEROIDTableColumns {
  column_name: string;
  column_type: string;
  created_at: Generated<Timestamp>;
  id: Generated<Int8>;
  long_desc: string | null;
  precision: Generated<Int8 | null>;
  scale: Generated<Int8 | null>;
  table_id: number;
  updated_at: Generated<Timestamp>;
}

export interface DATASTEROIDUsers {
  authentication_id: Int8 | null;
  created_at: Generated<Timestamp>;
  email: string;
  first_name: string;
  id: Generated<Int8>;
  last_name: string | null;
  middle_name: string | null;
  profile_picture_url: string | null;
  refresh_token_id: string | null;
  signin_provider: string;
  updated_at: Generated<Timestamp>;
  user_details: Generated<Json | null>;
}

export interface DB {
  "DATA_STEROID.APIKeys": DATASTEROIDAPIKeys;
  "DATA_STEROID.Authentication": DATASTEROIDAuthentication;
  "DATA_STEROID.AvailableConnectors": DATASTEROIDAvailableConnectors;
  "DATA_STEROID.Charts": DATASTEROIDCharts;
  "DATA_STEROID.Connections": DATASTEROIDConnections;
  "DATA_STEROID.ConnectionSchemas": DATASTEROIDConnectionSchemas;
  "DATA_STEROID.ConnectionSchemasLabelMapping": DATASTEROIDConnectionSchemasLabelMapping;
  "DATA_STEROID.ConnectionsLabelMapping": DATASTEROIDConnectionsLabelMapping;
  "DATA_STEROID.ConnectionTableColumnsLabelMapping": DATASTEROIDConnectionTableColumnsLabelMapping;
  "DATA_STEROID.ConnectionTables": DATASTEROIDConnectionTables;
  "DATA_STEROID.ConnectionTablesLabelMapping": DATASTEROIDConnectionTablesLabelMapping;
  "DATA_STEROID.ConnectorProfilingSupport": DATASTEROIDConnectorProfilingSupport;
  "DATA_STEROID.CubeJobsMetadata": DATASTEROIDCubeJobsMetadata;
  "DATA_STEROID.DashboardCubeMapping": DATASTEROIDDashboardCubeMapping;
  "DATA_STEROID.DashboardRelation": DATASTEROIDDashboardRelation;
  "DATA_STEROID.Dashboards": DATASTEROIDDashboards;
  "DATA_STEROID.DashboardTables": DATASTEROIDDashboardTables;
  "DATA_STEROID.Databases": DATASTEROIDDatabases;
  "DATA_STEROID.DataEnrichmentRules": DATASTEROIDDataEnrichmentRules;
  "DATA_STEROID.DatasetLabelMapping": DATASTEROIDDatasetLabelMapping;
  "DATA_STEROID.Datasets": DATASTEROIDDatasets;
  "DATA_STEROID.DatasetTables": DATASTEROIDDatasetTables;
  "DATA_STEROID.DatasetTablesColumns": DATASTEROIDDatasetTablesColumns;
  "DATA_STEROID.DestinationTables": DATASTEROIDDestinationTables;
  "DATA_STEROID.Environment": DATASTEROIDEnvironment;
  "DATA_STEROID.EnvironmentData": DATASTEROIDEnvironmentData;
  "DATA_STEROID.Labels": DATASTEROIDLabels;
  "DATA_STEROID.PipeDAG": DATASTEROIDPipeDAG;
  "DATA_STEROID.Pipes": DATASTEROIDPipes;
  "DATA_STEROID.PipeTriggerEvents": DATASTEROIDPipeTriggerEvents;
  "DATA_STEROID.PipeTriggerMetrics": DATASTEROIDPipeTriggerMetrics;
  "DATA_STEROID.PipeTriggers": DATASTEROIDPipeTriggers;
  "DATA_STEROID.PipeTriggersQueue": DATASTEROIDPipeTriggersQueue;
  "DATA_STEROID.ProjectLabelMapping": DATASTEROIDProjectLabelMapping;
  "DATA_STEROID.Projects": DATASTEROIDProjects;
  "DATA_STEROID.ProjectsDatasetsMapping": DATASTEROIDProjectsDatasetsMapping;
  "DATA_STEROID.ProjectsPipesMapping": DATASTEROIDProjectsPipesMapping;
  "DATA_STEROID.PublicTokens": DATASTEROIDPublicTokens;
  "DATA_STEROID.QueryPlan": DATASTEROIDQueryPlan;
  "DATA_STEROID.QueryPlanDAGNodes": DATASTEROIDQueryPlanDAGNodes;
  "DATA_STEROID.QueryPlanResourceAllocation": DATASTEROIDQueryPlanResourceAllocation;
  "DATA_STEROID.QueryPlanVersion": DATASTEROIDQueryPlanVersion;
  "DATA_STEROID.QueryPlanVersionDeltas": DATASTEROIDQueryPlanVersionDeltas;
  "DATA_STEROID.Role": DATASTEROIDRole;
  "DATA_STEROID.Roles": DATASTEROIDRoles;
  "DATA_STEROID.TableColumns": DATASTEROIDTableColumns;
  "DATA_STEROID.Users": DATASTEROIDUsers;
}
