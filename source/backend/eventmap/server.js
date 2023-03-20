function action_load(params) {
    core.log("@loaded_start")
  
  	const [dbtoken, err] = self.module_execute("maindb", "ticket", "", {})
    if (err) {
      return utils.err_response(err)
    }
    
    return utils.ok_response({
        dbtoken,
    })
}