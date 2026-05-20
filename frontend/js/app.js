const API_BASE = "http://localhost:8000";

document.addEventListener('DOMContentLoaded', () => {
    const targetBtns = document.querySelectorAll('.target-btn');
    
    // 타겟 버튼 클릭 이벤트 처리
    targetBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 모든 버튼에서 active 클래스 제거
            targetBtns.forEach(b => b.classList.remove('active'));
            // 클릭된 버튼에 active 클래스 추가
            e.target.classList.add('active');
        });
    });
});

async function convertTone() {
    const text = document.getElementById("inputText").value.trim();
    const activeBtn = document.querySelector(".target-btn.active");
    const target = activeBtn ? activeBtn.dataset.target : null;

    if (!text) {
        alert("변환할 원문을 입력해주세요.");
        document.getElementById("inputText").focus();
        return;
    }

    if (!target) {
        alert("수신 대상을 선택해주세요.");
        return;
    }

    setLoading(true);
    document.getElementById("outputText").value = "";
    document.getElementById("copyBtn").disabled = true;

    try {
        const response = await fetch(`${API_BASE}/api/convert`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                text: text, 
                target_audience: target 
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || `서버 에러 (${response.status})`);
        }

        const data = await response.json();
        document.getElementById("outputText").value = data.converted_text;
        document.getElementById("copyBtn").disabled = false;

    } catch (error) {
        console.error("Conversion error:", error);
        alert(`변환 중 오류가 발생했습니다: ${error.message}`);
    } finally {
        setLoading(false);
    }
}

function setLoading(isLoading) {
    const loadingEl = document.getElementById('loading');
    const convertBtn = document.getElementById('convertBtn');
    
    if (isLoading) {
        loadingEl.classList.remove('hidden');
        convertBtn.disabled = true;
        convertBtn.textContent = "변환 중...";
    } else {
        loadingEl.classList.add('hidden');
        convertBtn.disabled = false;
        convertBtn.textContent = "변환하기";
    }
}

async function copyResult() {
    const outputText = document.getElementById("outputText").value;
    if (!outputText) return;

    try {
        await navigator.clipboard.writeText(outputText);
        
        const copyBtn = document.getElementById("copyBtn");
        const originalText = copyBtn.textContent;
        
        copyBtn.textContent = "복사 완료!";
        copyBtn.style.backgroundColor = "#28a745";
        copyBtn.style.color = "white";
        copyBtn.style.borderColor = "#28a745";
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = "";
            copyBtn.style.color = "";
            copyBtn.style.borderColor = "";
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
        alert('클립보드 복사에 실패했습니다.');
    }
}
