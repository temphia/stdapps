function action_load(params) {
    core.log("@loaded_start")


    const [itkt, ierr] = self.module_ticket("self_plugstate", {})

    if (ierr) {
        core.log("@merr" + ierr)
        return (ierr)
    }

    core.log("@loaded_end")

    return {
        state_tkt: itkt,
    }
}