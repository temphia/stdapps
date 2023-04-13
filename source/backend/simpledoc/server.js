function action_load(params) {

    const room = new SockdRoom("syncdoc")
    const [ticket, err] = room.ticket()
    if (err) {
        core.log("@room_tkt_err" + err)
        return utils.err_response(err)
    }

    const [pstkt, pserr] = plugkv.get_ticket({})
    if (pserr) {
        core.log("@plug_state_err" + pserr)
        return utils.err_response(pserr)
    }

    return utils.ok_response({
        room_tkt: ticket,
        plug_state: pstkt,
    })
}