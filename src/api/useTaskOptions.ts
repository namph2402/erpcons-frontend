import { useEffect, useState } from 'react'
import { fetchTaskOptions, type TaskOptions } from './tasks'

const EMPTY: TaskOptions = {
  projects: [],
  jobs: [],
  dplans: [],
  people: [],
  weights: [],
  states: [],
}

/**
 * Nạp danh sách lựa chọn cho form tác vụ từ Drupal.
 *
 * Gọi một lần ở trang cha rồi truyền xuống form — đừng gọi trong chính modal,
 * vì trang cha mount lại modal kèm `key` mỗi lần mở, sẽ thành gọi API lại mỗi
 * lần bấm "Thêm mới".
 *
 * Lưu ý về `jobs`: Drupal lọc cứng theo cấu hình KPI của người đăng nhập
 * (KpiUserJobs). Tài khoản chưa được gán công việc nào sẽ nhận mảng RỖNG — đó
 * là đúng thiết kế, không phải lỗi. Form vì vậy phải hiển thị được trạng thái
 * "chưa có công việc nào được gán" thay vì một ô select trống vô nghĩa.
 */
export function useTaskOptions() {
  const [options, setOptions] = useState<TaskOptions>(EMPTY)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true

    fetchTaskOptions()
      .then((data) => {
        if (!alive) return
        setOptions({
          projects: data.projects ?? [],
          jobs: data.jobs ?? [],
          dplans: data.dplans ?? [],
          people: data.people ?? [],
          weights: data.weights ?? [],
          states: data.states ?? [],
        })
      })
      .catch((e: Error) => alive && setError(e.message))
      .finally(() => alive && setLoading(false))

    return () => {
      alive = false
    }
  }, [])

  return { options, loading, error }
}
