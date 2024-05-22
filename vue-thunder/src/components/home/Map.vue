<template>
  <div>
    <div id="map"></div>
    <button class="map-btn" @click="initMap">내위치</button>
    <button class="btn" @click="goCreateThunder">번개 만들기</button>
    <List />
  </div>
</template>

<script setup>
import List from '@/components/home/List.vue'

import { onMounted, ref, toRaw, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useThunderStore } from '@/stores/thunder';

const store = useThunderStore();

let map = null;
const markers = ref([]);
const overlays = ref([]);

const router = useRouter();
const goCreateThunder = () => {
  router.push({ name: 'thunderCreate' });
};

// 이미지 URL 가져오는 함수
const getImageUrl = (imagePath) => {
  return imagePath ? new URL(`/src/assets/thunder/${imagePath}`, import.meta.url).href :
    new URL(`@/assets/thunder/thunderDefault.png`, import.meta.url).href;
};

const initMap = function () {
  let myCenter = new kakao.maps.LatLng(33.450701, 126.570667); // 카카오본사
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      myCenter = new kakao.maps.LatLng(lat, lon);
      map.setCenter(myCenter);
    });
  }

  const container = document.getElementById('map');
  const options = {
    center: myCenter,
    level: 6,
  }; // 지도 객체를 등록합니다.
  map = new kakao.maps.Map(container, options);

  // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
  const mapTypeControl = new kakao.maps.MapTypeControl();
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
  // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
  const zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  // 기존 마커 및 오버레이 추가
  addMarkers(store.thunderList);
};

const addMarkers = (thunders) => {
  if (!window.kakao || !window.kakao.maps) {
    console.error("Kakao Maps API is not loaded yet.");
    return;
  }

  // 기존 마커 및 오버레이 제거
  markers.value.forEach(marker => marker.setMap(null));
  overlays.value.forEach(overlay => overlay.setMap(null));
  markers.value = [];
  overlays.value = [];

  thunders.forEach(thunder => {
    const coords = new kakao.maps.LatLng(thunder.latitude, thunder.longitude);
    const marker = new kakao.maps.Marker({
      map: toRaw(map),
      position: coords,
      title: thunder.title // 마커에 제목 추가
    });

    // 마커 이벤트 리스너 추가
    kakao.maps.event.addListener(marker, 'mouseover', () => {
      marker.setZIndex(100);
      marker.setOpacity(0.8);
    });

    kakao.maps.event.addListener(marker, 'mouseout', () => {
      marker.setZIndex(0);
      marker.setOpacity(1);
    });

    const overlayContent = document.createElement('div');
    overlayContent.className = 'customoverlay';
    overlayContent.innerHTML = `
      <div class="customoverlay-content">
        <button class="close">X</button>
        <div class="thunder-info">
          <img src="${getImageUrl(thunder.image)}" alt="Thunder Image" class="thunder-image">
          <div class="thunder-details">
            <div class="category">${thunder.category}</div>
            <h3>${thunder.title}</h3>
            <div class="date-location">
              <p>날짜: ${thunder.dateTime}</p>
              <p>장소: ${thunder.addressName}</p>
            </div>
            <button class="details">자세히 보기</button>
          </div>
        </div>
      </div>
    `;


    // 인라인 스타일 적용
    overlayContent.style.position = 'absolute';
    overlayContent.style.bottom = '30px';
    overlayContent.style.borderRadius = '6px';
    overlayContent.style.border = '1px solid #ccc';
    overlayContent.style.borderBottom = '2px solid #ddd';
    overlayContent.style.fontSize = '12px';
    overlayContent.style.padding = '10px';
    overlayContent.style.background = '#fff';
    overlayContent.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.15)';

    const overlay = new kakao.maps.CustomOverlay({
      content: overlayContent,
      map: null, // 처음엔 닫힌 상태
      position: coords
    });

    overlayContent.querySelector('.close').onclick = () => closeOverlay(overlay);
    overlayContent.querySelector('.details').onclick = () => viewDetails(thunder.id);

    kakao.maps.event.addListener(marker, 'click', () => {
      closeAllOverlays(); // 모든 오버레이를 닫기
      overlay.setMap(toRaw(map));
    });

    markers.value.push(marker);
    overlays.value.push(overlay);
  });
};

const closeAllOverlays = () => {
  overlays.value.forEach(overlay => overlay.setMap(null));
};

const closeOverlay = (overlay) => {
  overlay.setMap(null);
};


const viewDetails = (id) => {
  router.push({ name: 'thunderDetail', params: { thunderId: id } });
};

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    kakao.maps.load(() => {
      initMap();
      // 초기 데이터 로드
      store.getThunderList();
    });
  } else {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${import.meta.env.VITE_KAKAO_JS_API_KEY}`;
    script.addEventListener('load', () => {
      kakao.maps.load(() => {
        initMap();
        // 초기 데이터 로드
        store.getThunderList();
      });
    });
    document.head.appendChild(script);
  }
});

// thunderList가 변경되면 지도에 마커 추가
watch(() => store.thunderList, (newVal) => {
  addMarkers(newVal);
});

// regionPoint가 변경되면 지도 위치 업데이트
watch(() => store.regionPoint, (newVal) => {
  if (newVal.x && newVal.y) {
    const coords = new kakao.maps.LatLng(newVal.y, newVal.x);
    map.setCenter(coords);
  }
});
</script>

<style scoped>
#map {
  height: 600px;
  border-radius: 10px;
}

.customoverlay {
  position: relative;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.customoverlay-content {
  display: flex;
  align-items: center;
  text-align: left;
  flex-wrap: wrap;
}

.customoverlay .close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.customoverlay .thunder-image {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 20px;
  object-fit: cover;
}

.customoverlay .thunder-details {
  display: flex;
  flex-direction: column;
}

.customoverlay .category {
  font-size: 14px;
  color: #aaa;
  margin-bottom: 5px;
}

.customoverlay h3 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

.customoverlay p {
  margin: 2px 0;
  font-size: 14px;
  color: #666;
}

.customoverlay .date-location {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.customoverlay .details {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #F3D849;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button {
  margin-top: 10px;
}

.btn {
  background-color: #F3D849;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 15px;
}

.map-btn {
  background-color: #E0E5E9;
  border: none;
  padding: 10px;
  border-radius: 15px;
  margin-right: 10px;
}
</style>
