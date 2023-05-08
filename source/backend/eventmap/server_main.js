function action_load(params) {
  core.log("@loaded_start")

  const [db, err1] = self.new_module("maindb", {})
  if (err1) {
    throw err1
  }

  const [dbtoken, err2] = self.module_execute(db, "ticket", {})
  if (err2) {
    throw err2;
  }

  return {
    dbtoken,
  }
}