import * as contractStatus from "../Constants/contractStatus";
import React from "react";

export function translateContractStatus(e) {
    switch (e) {
        case "inProgress":
            return contractStatus.INPROGRESS;
        case "waitingTeacher":
            return contractStatus.WAITTING_TEACHER
        case "waitingStudent":
            return contractStatus.WAITTING_STUDENT
        case "complaining":
            return contractStatus.COMPLAINING
        case "finished":
            return contractStatus.FINISH
        case "canceled":
            return contractStatus.CANCEL
    }
    return "";
}

export function milisecondToDateString(e) {
    if (e)
        return new Date(e).toLocaleString()
    return null
}