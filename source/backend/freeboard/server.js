function action_load(params) {
    core.log("@loaded_start")

    const [tkt, err] = plugkv.get_ticket({})
    if (err) {
        core.log("@err" + err)
        return utils.err_response(err)
    }

    core.log("@loaded_end")

    return utils.ok_response({
        state_token: tkt,
    })
}