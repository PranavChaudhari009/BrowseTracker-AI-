import sqlite3
import shutil
import os
from datetime import datetime, timedelta


CHROME_HISTORY = r"C:\Users\LENOVO\AppData\Local\Google\Chrome\User Data\Default\History"

COPY_PATH = "History_copy"


def copy_history():
    if os.path.exists(COPY_PATH):
        os.remove(COPY_PATH)

    shutil.copy2(CHROME_HISTORY, COPY_PATH)


def read_history():
    conn = sqlite3.connect(COPY_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            title,
            url,
            last_visit_time
        FROM urls
        ORDER BY last_visit_time DESC
        LIMIT 1000
    """)

    rows = cursor.fetchall()

    conn.close()

    return rows


if __name__ == "__main__":
    copy_history()

    history = read_history()

    for row in history:
        print(row)



 