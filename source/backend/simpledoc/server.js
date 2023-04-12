function action_load(params) {

    const room = new SockdRoom("syncdoc")
    const [ticket, err] = room.ticket()
    if (err) {
        return utils.err_response(err)
    }
    return utils.ok_response({
        room_tkt: ticket,
    })
}