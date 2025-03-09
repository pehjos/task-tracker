export const formatDate = (dateStr: string | Date): string => {
	const today = new Date();
	const taskDate = new Date(dateStr);
	if (isNaN(taskDate.getTime())) {
	  return "Invalid date";
	}
  
	const differenceInTime = today.getTime() - taskDate.getTime();
	const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  
	if (differenceInDays === 0) return "Today";
	if (differenceInDays === 1) return "Yesterday";
  
	return taskDate.toLocaleDateString();
  };
  