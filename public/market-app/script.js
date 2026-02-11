/**
 * 알림 시스템 클라이언트 구현 (Vanilla JS)
 */

// API 기본 경로 (환경에 맞게 수정 필요)
const API_BASE_URL = "/api/notifications";

// DOM 요소 참조
const dom = {
  badge: document.getElementById("notification-badge"),
  list: document.getElementById("notification-list"),
  toastContainer: document.getElementById("toast-container"),
  icon: document.getElementById("notification-icon"),
};

// ==========================================
// 1. 초기화 및 이벤트 리스너
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // 1) 안 읽은 알림 개수 가져오기
  fetchUnreadCount();

  // 2) 실시간 알림 연결 (SSE)
  connectSSE();

  // 3) 알림 아이콘 클릭 시 목록 조회
  dom.icon.addEventListener("click", () => {
    const isVisible = dom.list.style.display === "block";
    dom.list.style.display = isVisible ? "none" : "block";

    if (!isVisible) {
      fetchNotifications(); // 열 때 목록 새로고침
    }
  });
});

// ==========================================
// 2. API 통신 함수 (Fetch)
// ==========================================

/**
 * 안 읽은 알림 개수 조회
 */
async function fetchUnreadCount() {
  try {
    // 인증 토큰이 필요하다면 headers에 Authorization 추가
    const response = await fetch(`${API_BASE_URL}/unread-count`);
    if (response.ok) {
      const count = await response.json();
      updateBadgeUI(count);
    }
  } catch (error) {
    console.error("알림 개수 조회 실패:", error);
  }
}

/**
 * 알림 목록 조회
 */
async function fetchNotifications() {
  try {
    const response = await fetch(`${API_BASE_URL}`); // 전체 목록 or 페이징
    if (response.ok) {
      const notifications = await response.json();
      renderNotificationList(notifications);
    }
  } catch (error) {
    console.error("알림 목록 조회 실패:", error);
  }
}

/**
 * 알림 읽음 처리
 * @param {number} id - 알림 ID
 */
async function markAsRead(id, element) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/read`, {
      method: "PATCH",
    });

    if (response.ok) {
      // UI 업데이트: 읽음 스타일 적용
      element.classList.add("read");
      element.classList.remove("unread");

      // 배지 개수 갱신 (1 감소)
      fetchUnreadCount();
    }
  } catch (error) {
    console.error("읽음 처리 실패:", error);
  }
}

// ==========================================
// 3. 실시간 알림 (SSE - Server-Sent Events)
// ==========================================

function connectSSE() {
  // SSE 연결 요청 (쿠키/세션 기반 인증 시 withCredentials: true 필요할 수 있음)
  const eventSource = new EventSource(`${API_BASE_URL}/subscribe`);

  // 연결 성공
  eventSource.onopen = () => {
    console.log("SSE 연결 성공");
  };

  // 서버로부터 메시지 수신 (이벤트 명을 'notification'으로 지정했다고 가정)
  eventSource.addEventListener("notification", (event) => {
    const data = JSON.parse(event.data);

    // 1. 토스트 팝업 띄우기
    showToast(data.content);

    // 2. 배지 카운트 증가
    fetchUnreadCount();

    // 3. 만약 알림 목록이 열려있다면 목록도 갱신
    if (dom.list.style.display === "block") {
      fetchNotifications();
    }
  });

  // 에러 발생 시
  eventSource.onerror = (error) => {
    console.error("SSE 연결 오류:", error);
    eventSource.close();
    // 필요 시 재연결 로직 추가 (setTimeout 등)
  };
}

// ==========================================
// 4. UI 렌더링 헬퍼 함수
// ==========================================

function updateBadgeUI(count) {
  if (count > 0) {
    dom.badge.textContent = count > 99 ? "99+" : count;
    dom.badge.style.display = "inline-block";
  } else {
    dom.badge.style.display = "none";
  }
}

function renderNotificationList(notifications) {
  dom.list.innerHTML = ""; // 기존 목록 초기화

  if (notifications.length === 0) {
    dom.list.innerHTML = "<li>새로운 알림이 없습니다.</li>";
    return;
  }

  notifications.forEach((noti) => {
    const li = document.createElement("li");
    li.className = noti.is_read ? "read" : "unread";
    li.innerHTML = `
            <div class="noti-content">
                <p>${noti.content}</p>
                <small>${new Date(noti.created_at).toLocaleString()}</small>
            </div>
        `;

    // 클릭 시 읽음 처리 및 이동
    li.addEventListener("click", () => {
      if (!noti.is_read) {
        markAsRead(noti.id, li);
      }
      // 관련 링크가 있다면 이동
      if (noti.related_url) {
        window.location.href = noti.related_url;
      }
    });

    dom.list.appendChild(li);
  });
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;

  dom.toastContainer.appendChild(toast);

  // 3초 후 제거
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
