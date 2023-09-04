import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";

export const addLogs = async (id, userName, userId, logMessage) => {
  const collRef = doc(db, "logs", id);
  const docSnap = await getDoc(collRef);

  if (docSnap.exists()) {
    let entryId = uuid();
    let data = docSnap.data().data;
    data.push({
      project: id,
      log: [
        {
          logId: entryId,
          userId: userId,
          userName: userName,
          logMessage: logMessage,
          date: Date.now(),
        },
      ],
    });

    const docRef = await setDoc(collRef, {
      data,
    }).then(() => {});
  } else {
    let entryId = uuid();
    const docRef = await setDoc(collRef, {
      data: [
        {
          project: id,
          log: [
            {
              logId: entryId,
              userId: userId,
              userName: userName,
              logMessage: logMessage,
              date: Date.now(),
            },
          ],
        },
      ],
    }).then(() => {});
  }
};
