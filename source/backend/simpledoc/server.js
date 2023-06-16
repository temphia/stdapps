function action_load(params) {

    const [ticket, err] = self.module_ticket("syncdoc", {})
    if (err) {
        core.log("@room_tkt_err" + err)
        throw (err)
    }

    const [pstkt, pserr] = self.module_ticket("self_plugstate", {})
    if (pserr) {
        core.log("@plug_state_err" + pserr)
        throw (pserr)
    }

    return {
        room_tkt: ticket,
        plug_state: pstkt,
    }
}