function action_load(params) {
    core.log("@loaded_start")

    const [itkt, ierr] = plugkv.get_ticket({})
    if (ierr) {
        core.log("@merr" + ierr)
        return utils.err_response(ierr)
    }

    core.log("@loaded_end")

    return utils.ok_response({
        state_tkt: itkt,
    })
}