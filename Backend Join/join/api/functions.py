def get_nearest_urgent_due_date(urgent_tasks):
    if urgent_tasks.exists():
        urgent_due_dates = [task.dueDate for task in urgent_tasks if task.dueDate]
        urgent_due_dates.sort()
        return urgent_due_dates[0] if urgent_due_dates else '-'
    else:
        return '-'