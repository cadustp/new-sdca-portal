export enum appUserReminderTypes {
    SEARCH_APP_USER_REMINDERS_REQUEST = 'SEARCH_APP_USER_REMINDERS_REQUEST',
    SEARCH_APP_USER_REMINDERS_SUCCESS = 'SEARCH_APP_USER_REMINDERS_SUCCESS',
    SEARCH_FIRST_PAGE_APP_USER_REMINDERS_SUCCESS = 'SEARCH_FIRST_PAGE_APP_USER_REMINDERS_SUCCESS',
    SEARCH_APP_USER_REMINDERS_FAILURE = 'SEARCH_APP_USER_REMINDERS_FAILURE',
    OPEN_SNACKBAR = 'OPEN_SNACKBAR',
    CLOSE_SNACKBAR = 'CLOSE_SNACKBAR',
    GET_REMINDERS_LOCATIONS = 'GET_REMINDERS_LOCATIONS',
    SET_REMINDERS_LOCATIONS = 'SET_REMINDERS_LOCATIONS',
}

export interface AppUserReminders {
    active: boolean,
    app_users:{
        data: Array<AppUser>
        length: 1
    } | [],
    end_date: string,
    form:{
        id: number,
        name: string,
        type: {id: number, name: string} | []
        version: "1"
    } | []

    rescheduled_reminders: []
    start_date: "2021-05-06T14:23:00.000Z"
    valuated_users: []
}

export interface AppUserRemindersState {
    app_users_reminders: { 
        data: Array<AppUserReminders> | [],
        pagination: {},
    },
    searchLoading: boolean,
    failure: boolean,
    infiniteLoading: boolean,
    inputText: string,
    snackbarState: {
        context: string,
        type: string,
        open: boolean,
    },
    remindersLocations: Array<Object> | [],
}

export interface AppUser {
    id: number
    name: string
    score_date: string
    status: number
    score:number

}