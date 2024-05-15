import $day from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'

$day.extend(utc)
$day.extend(timezone)
$day.extend(relativeTime)
