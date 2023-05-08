function action_load(params) {

    const room = new SockdRoom("syncdoc")
    const [ticket, err] = room.ticket()
    if (err) {
        core.log("@room_tkt_err" + err)
        throw (err)
    }

    const [pstkt, pserr] = plugkv.get_ticket({})
    if (pserr) {
        core.log("@plug_state_err" + pserr)
        throw (pserr)
    }

    return {
        room_tkt: ticket,
        plug_state: pstkt,
    }
}