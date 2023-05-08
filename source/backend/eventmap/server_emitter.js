function action_emit(params) {
    const [db, err1] = self.new_module("maindb", {})
    if (err1) {
        throw err1
    }

    const [resp, err2] = self.module_execute(db, "new_row", JSON.parse(params.data))
    if (err2) {
        return err2
    }

    return (resp)
}

function action_load(params) {

    const [db, err1] = self.new_module("maindb", {})
    if (err1) {
        throw err1
    }

    const [resp, err2] = self.module_execute(db, "simple_query", {
        table: "ettypes",
    })

    if (err2) {
        throw err2
    }

    return ({
        event_types: resp["rows"] || [],
    })
}