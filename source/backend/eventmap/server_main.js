function action_load(params) {
  core.log("@loaded_start")

  const [dbtoken, err2] = self.module_ticket("maindb", {})
  if (err2) {
    throw err2;
  }

  return {
    dbtoken,
  }
}