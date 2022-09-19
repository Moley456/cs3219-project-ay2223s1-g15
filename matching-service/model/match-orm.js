import { createWaitingUser, matchWaitingUser } from './repsitory.js'

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateWaitingUser(username, difficultylevel) {
  try {
    const newWaitingUser = await createWaitingUser(username, difficultylevel);
    newWaitingUser.save();
    return true;
  } catch (err) {
    console.error(err);
    console.log('ERROR: Could not create a waiting user');
    return { err };
  }
}

export async function ormCreateMatchedUsers(waitingUser) {
  try {
    const matchedUser = await matchWaitingUser(waitingUser);
    if (matchedUser === null) {
      return false;
    } else {
      matchedUser.save();
      return matchedUser.roomId;
    }
  } catch (err) {
    return { err }
  }
}
