function action_emit(params) {
    Core.Log("@hell" + JSON.stringify(params))
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