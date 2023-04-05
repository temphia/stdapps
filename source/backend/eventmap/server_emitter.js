function action_emit(params) {
    const [resp, err] = self.module_execute("maindb", "new_row", "0/events", JSON.parse(utils.ab2str(params.data)))
    if (err) {
        return utils.err_response(err)
    }

    return utils.ok_response(resp)
}

function action_load(params) {
    const [resp, err] = self.module_execute("maindb", "simple_query", "0/ettypes", {})
    if (err) {
        return utils.err_response(err)
    }

    return utils.ok_response({
        event_types: resp["rows"] || [],
    })
}