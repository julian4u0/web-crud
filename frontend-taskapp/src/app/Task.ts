export interface Task {
  "name": string;
  "priority": string;
  "expire": boolean,
  "ownerid": string,
  "success": boolean,
  "data": any,
  "taskid": string
}