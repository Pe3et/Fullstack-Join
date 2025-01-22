import random

"""
Returns the nearest urgent date to come for the summary or '-' if there is none.
"""
def get_nearest_urgent_due_date(urgent_tasks):
    if urgent_tasks.exists():
        urgent_due_dates = [
            task.dueDate for task in urgent_tasks if task.dueDate]
        urgent_due_dates.sort()
        return urgent_due_dates[0] if urgent_due_dates else '-'
    else:
        return '-'

"""
Returns a random color for a contact to use for it's icon in frontend.
"""
def get_random_color():
    colors = [
        "#FF7A00",
        "#9327FF",
        "#6E52FF",
        "#FC71FF",
        "#FFBB2B",
        "#1FD7C1",
        "#462F8A",
        "#FF4646",
        "#00BEE8",
        "#FF7A00"
    ]
    return random.choice(colors)
