const ENVIRONMENTS: any = {
    DEV: "http://localhost:3600/api-dev",
    QA: "http://localhost:3900/api-qa",
    PROD: "https://api.ascript.live/api"
}

export const API = ENVIRONMENTS['DEV'];