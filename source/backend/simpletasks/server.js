function action_load(params) {
    core.log("@loaded_start")

    const [itkt, ierr] = plugkv.get_ticket({})
    if (ierr) {
        core.log("@merr" + ierr)
        throw ierr
    }

    core.log("@loaded_end")

    return {
        state_tkt: itkt,
    }
}