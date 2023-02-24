function action_load(params) {
    core.log("@loaded_start")

    const [mtkt, merr] = plugkv.get_ticket({
        state_tag1: "meta",
    })
    if (merr) {
        core.log("@merr" + merr)
        return utils.err_response(merr)
    }

    const [btkt, berr] = plugkv.get_ticket({
        state_tag1: "board",
    })
    if (berr) {
        core.log("@berr" + berr)
        return utils.err_response(berr)
    }

    core.log("@loaded_end")

    return utils.ok_response({
        meta_state_tkt: mtkt,
        board_state_tkt: btkt,
    })
}