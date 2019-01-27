datacenter = "eu"
data_dir = "/opt/consul"
log_level = "INFO"
node_name = "triton"
encrypt = "U2hIZ1Z4N2cxeCFkS3k4OXVXO1doL1cq"
server = true
ui = true

ports= {
  dns = 9600,
  http = 9500,
  https = -1,
  serf_lan = 9301,
  serf_wan = 9302,
  server = 9300
}