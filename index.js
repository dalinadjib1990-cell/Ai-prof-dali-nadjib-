<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV Arabic AI - منشئ السيرة الذاتية</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800&family=Almarai:wght@300;400;700;800&family=Tajawal:wght@300;400;500;700;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Reem+Kufi:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Cairo', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            color: #1e293b;
            min-height: 100vh;
            padding: 20px;
            transition: all 0.3s ease;
        }

        body.dark {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            color: #f1f5f9;
        }

        .container {
            max-width: 1500px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            animation: fadeInDown 0.6s ease;
        }

        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .header h1 {
            font-size: clamp(2rem, 5vw, 3.5rem);
            font-weight: 800;
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
            font-family: 'Tajawal', sans-serif;
            letter-spacing: 1px;
        }

        .header p {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 300;
        }

        .main-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            animation: fadeIn 0.8s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @media (max-width: 1024px) {
            .main-grid {
                grid-template-columns: 1fr;
            }
        }

        .card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 25px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
        }

        body.dark .card {
            background: rgba(30, 41, 59, 0.95);
        }

        .form-section {
            max-height: 80vh;
            overflow-y: auto;
            padding-left: 10px;
        }

        .form-section::-webkit-scrollbar {
            width: 8px;
        }

        .form-section::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }

        .form-section::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
        }

        .section-title {
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 18px;
            color: #667eea;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: 'Tajawal', sans-serif;
        }

        body.dark .section-title {
            color: #a78bfa;
        }

        .section-title::before {
            content: '';
            width: 4px;
            height: 28px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
        }

        .form-group {
            margin-bottom: 18px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #475569;
            font-size: 16px;
        }

        body.dark label {
            color: #cbd5e1;
        }

        input, textarea, select {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 16px;
            font-family: 'Cairo', sans-serif;
            transition: all 0.3s ease;
            background: white;
        }

        body.dark input,
        body.dark textarea,
        body.dark select {
            background: #334155;
            border-color: #475569;
            color: #f1f5f9;
        }

        input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        textarea {
            resize: vertical;
            min-height: 100px;
        }

        .photo-upload {
            text-align: center;
            padding: 30px;
            border: 3px dashed #cbd5e1;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: #f8fafc;
        }

        body.dark .photo-upload {
            background: #1e293b;
            border-color: #475569;
        }

        .photo-upload:hover {
            border-color: #667eea;
            background: rgba(102, 126, 234, 0.05);
        }

        .photo-preview {
            margin-top: 15px;
        }

        .photo-preview img {
            max-width: 150px;
            max-height: 150px;
            border-radius: 50%;
            border: 4px solid #667eea;
            object-fit: cover;
        }

        .btn {
            padding: 13px 26px;
            border: none;
            border-radius: 12px;
            font-size: 17px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Cairo', sans-serif;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            justify-content: center;
        }

        .btn:active {
            transform: scale(0.98);
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
        }

        .btn-success {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
        }

        .btn-success:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(16, 185, 129, 0.6);
        }

        .btn-info {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
        }

        .btn-info:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(59, 130, 246, 0.6);
        }

        .template-selector {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 12px;
            margin-bottom: 20px;
        }

        .template-option {
            padding: 18px 12px;
            border: 3px solid #e2e8f0;
            border-radius: 14px;
            cursor: pointer;
            text-align: center;
            transition: all 0.3s ease;
            font-weight: 600;
            background: white;
            font-size: 15px;
        }

        body.dark .template-option {
            background: #1e293b;
            border-color: #475569;
        }

        .template-option:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .template-option.active {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .template-option.blue.active {
            border-color: #3b82f6;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
        }

        .template-option.purple.active {
            border-color: #8b5cf6;
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
            color: white;
        }

        .template-option.gold.active {
            border-color: #f59e0b;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
        }

        .template-option.green.active {
            border-color: #10b981;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
        }

        .template-option.red.active {
            border-color: #ef4444;
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
        }

        .template-option.teal.active {
            border-color: #14b8a6;
            background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
            color: white;
        }

        .dynamic-list {
            margin-top: 15px;
        }

        .dynamic-item {
            background: #f1f5f9;
            padding: 15px;
            padding-right: 45px;
            border-radius: 10px;
            margin-bottom: 10px;
            position: relative;
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        body.dark .dynamic-item {
            background: #334155;
        }

        .dynamic-item input,
        .dynamic-item textarea {
            margin-bottom: 10px;
        }

        .btn-remove {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #ef4444;
            color: white;
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }

        .btn-remove:hover {
            background: #dc2626;
            transform: scale(1.1);
        }

        .btn-add {
            margin-top: 10px;
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
            color: white;
        }

        /* قوالب السيرة الذاتية */
        .cv-preview {
            background: white;
            color: #1e293b;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            min-height: 600px;
        }

        /* القالب الأزرق الكلاسيكي */
        .template-blue {
            font-family: 'Cairo', sans-serif;
        }

        .template-blue .cv-header {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }

        .template-blue .cv-photo {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 5px solid white;
            object-fit: cover;
            margin-bottom: 20px;
        }

        .template-blue .cv-name {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 10px;
        }

        .template-blue .cv-body {
            padding: 35px;
        }

        .template-blue .cv-section {
            margin-bottom: 28px;
        }

        .template-blue .cv-section-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1e40af;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 3px solid #3b82f6;
        }

        /* القالب البنفسجي العصري */
        .template-purple {
            font-family: 'Almarai', sans-serif;
            display: grid;
            grid-template-columns: 300px 1fr;
        }

        .template-purple .cv-sidebar {
            background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
            color: white;
            padding: 40px 30px;
        }

        .template-purple .cv-photo {
            width: 180px;
            height: 180px;
            border-radius: 20px;
            object-fit: cover;
            margin-bottom: 25px;
            border: 4px solid rgba(255, 255, 255, 0.3);
        }

        .template-purple .cv-name {
            font-size: 2rem;
            font-weight: 800;
            margin-bottom: 15px;
        }

        .template-purple .cv-main {
            padding: 40px;
        }

        .template-purple .cv-section-title {
            font-size: 1.4rem;
            font-weight: 700;
            color: #7c3aed;
            margin-bottom: 15px;
            margin-top: 25px;
        }

        .template-purple .sidebar-section-title {
            font-size: 1.2rem;
            font-weight: 700;
            margin-top: 25px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid rgba(255, 255, 255, 0.3);
        }

        /* القالب الذهبي الإبداعي */
        .template-gold {
            font-family: 'Tajawal', sans-serif;
            position: relative;
        }

        .template-gold .cv-header {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
            color: white;
            padding: 50px;
            clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
            padding-bottom: 70px;
        }

        .template-gold .cv-photo {
            width: 160px;
            height: 160px;
            border-radius: 30px;
            object-fit: cover;
            border: 6px solid white;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .template-gold .cv-header-content {
            display: flex;
            align-items: center;
            gap: 30px;
        }

        .template-gold .cv-name {
            font-size: 2.8rem;
            font-weight: 900;
            margin-bottom: 10px;
        }

        .template-gold .cv-body {
            padding: 40px 50px;
        }

        .template-gold .cv-section-title {
            font-size: 1.6rem;
            font-weight: 900;
            color: #f59e0b;
            margin-bottom: 15px;
            margin-top: 25px;
            position: relative;
            padding-right: 20px;
        }

        .template-gold .cv-section-title::before {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 8px;
            height: 40px;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            border-radius: 10px;
        }

        /* القالب الأخضر الطبيعي */
        .template-green {
            font-family: 'IBM Plex Sans Arabic', sans-serif;
        }

        .template-green .cv-header {
            background: linear-gradient(135deg, #059669 0%, #10b981 100%);
            color: white;
            padding: 45px;
            position: relative;
        }

        .template-green .cv-header::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            height: 5px;
            background: linear-gradient(90deg, #fbbf24, #34d399, #10b981);
        }

        .template-green .cv-photo {
            width: 140px;
            height: 140px;
            border-radius: 15px;
            border: 5px solid rgba(255, 255, 255, 0.9);
            object-fit: cover;
            margin-bottom: 20px;
        }

        .template-green .cv-name {
            font-size: 2.4rem;
            font-weight: 800;
            margin-bottom: 8px;
        }

        .template-green .cv-body {
            padding: 35px;
            background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%);
        }

        .template-green .cv-section-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #059669;
            margin-bottom: 15px;
            margin-top: 25px;
            padding: 10px 15px;
            background: linear-gradient(90deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%);
            border-right: 4px solid #10b981;
        }

        /* القالب الأحمر الجريء */
        .template-red {
            font-family: 'Reem Kufi', sans-serif;
            background: #fff;
        }

        .template-red .cv-header {
            background: linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #ef4444 100%);
            color: white;
            padding: 50px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .template-red .cv-header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
        }

        .template-red .cv-photo {
            width: 170px;
            height: 170px;
            border-radius: 50%;
            border: 6px solid white;
            object-fit: cover;
            margin-bottom: 20px;
            position: relative;
            z-index: 1;
        }

        .template-red .cv-name {
            font-size: 2.6rem;
            font-weight: 800;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
        }

        .template-red .cv-body {
            padding: 40px;
        }

        .template-red .cv-section-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #dc2626;
            margin-bottom: 15px;
            margin-top: 25px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* القالب الفيروزي الأنيق */
        .template-teal {
            font-family: 'Cairo', sans-serif;
            display: grid;
            grid-template-columns: 350px 1fr;
        }

        .template-teal .cv-sidebar {
            background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%);
            color: white;
            padding: 40px 30px;
            position: relative;
        }

        .template-teal .cv-sidebar::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 150px;
            background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%);
        }

        .template-teal .cv-photo {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 25px;
            border: 5px solid rgba(255, 255, 255, 0.4);
            position: relative;
            z-index: 1;
        }

        .template-teal .cv-name {
            font-size: 2.2rem;
            font-weight: 800;
            margin-bottom: 15px;
            position: relative;
            z-index: 1;
        }

        .template-teal .cv-main {
            padding: 45px;
            background: #ffffff;
        }

        .template-teal .cv-section-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #0d9488;
            margin-bottom: 15px;
            margin-top: 25px;
            position: relative;
            padding-bottom: 10px;
        }

        .template-teal .cv-section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 80px;
            height: 3px;
            background: linear-gradient(90deg, #14b8a6, transparent);
        }

        .template-teal .sidebar-section-title {
            font-size: 1.2rem;
            font-weight: 700;
            margin-top: 25px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid rgba(255, 255, 255, 0.3);
            position: relative;
            z-index: 1;
        }

        /* العناصر المشتركة */
        .cv-info-item {
            margin-bottom: 10px;
            line-height: 1.6;
        }

        .cv-list-item {
            margin-bottom: 15px;
            padding-right: 20px;
            position: relative;
        }

        .cv-list-item::before {
            content: '●';
            position: absolute;
            right: 0;
            color: currentColor;
            font-size: 12px;
        }

        .skill-tag {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            margin: 5px;
            font-weight: 600;
            font-size: 14px;
        }

        .template-blue .skill-tag {
            background: rgba(59, 130, 246, 0.15);
            color: #1e40af;
        }

        .template-purple .skill-tag {
            background: rgba(168, 85, 247, 0.2);
            color: #7c3aed;
        }

        .template-gold .skill-tag {
            background: rgba(245, 158, 11, 0.2);
            color: #d97706;
        }

        .template-green .skill-tag {
            background: rgba(16, 185, 129, 0.15);
            color: #059669;
        }

        .template-red .skill-tag {
            background: rgba(239, 68, 68, 0.15);
            color: #dc2626;
        }

        .template-teal .skill-tag {
            background: rgba(20, 184, 166, 0.15);
            color: #0d9488;
        }

        .export-section {
            margin-top: 25px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }

        @media (max-width: 768px) {
            .export-section {
                grid-template-columns: 1fr;
            }
        }

        .loading {
            display: none;
            text-align: center;
            padding: 20px;
        }

        .loading.active {
            display: block;
        }

        .spinner {
            border: 4px solid rgba(102, 126, 234, 0.1);
            border-top: 4px solid #667eea;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* responsive تصميم القوالب ثنائية العمود */
        @media (max-width: 768px) {
            .template-purple,
            .template-teal {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>CV Arabic AI</h1>
            <p>منشئ السيرة الذاتية الاحترافي بالذكاء الاصطناعي</p>
        </div>

        <div class="main-grid">
            <!-- نموذج الإدخال -->
            <div class="card">
                <div class="form-section">
                    <div class="section-title">اختر القالب</div>
                    <div class="template-selector">
                        <div class="template-option blue active" data-template="blue">
                            <div>🔵 أزرق كلاسيكي</div>
                        </div>
                        <div class="template-option purple" data-template="purple">
                            <div>🟣 بنفسجي عصري</div>
                        </div>
                        <div class="template-option gold" data-template="gold">
                            <div>🟡 ذهبي إبداعي</div>
                        </div>
                        <div class="template-option green" data-template="green">
                            <div>🟢 أخضر طبيعي</div>
                        </div>
                        <div class="template-option red" data-template="red">
                            <div>🔴 أحمر جريء</div>
                        </div>
                        <div class="template-option teal" data-template="teal">
                            <div>🩵 فيروزي أنيق</div>
                        </div>
                    </div>

                    <div class="section-title">الصورة الشخصية</div>
                    <div class="form-group">
                        <div class="photo-upload" onclick="document.getElementById('photoInput').click()">
                            <div>📸 اضغط لتحميل الصورة</div>
                            <div class="photo-preview" id="photoPreview"></div>
                        </div>
                        <input type="file" id="photoInput" accept="image/*" style="display: none;">
                    </div>

                    <div class="section-title">المعلومات الشخصية</div>
                    <div class="form-group">
                        <label>الاسم الكامل</label>
                        <input type="text" id="fullName" placeholder="محمد أحمد">
                    </div>
                    <div class="form-group">
                        <label>اللقب / المسمى الوظيفي</label>
                        <input type="text" id="title" placeholder="مطور ويب">
                    </div>
                    <div class="form-group">
                        <label>تاريخ الميلاد</label>
                        <input type="date" id="birthDate">
                    </div>
                    <div class="form-group">
                        <label>مكان الإقامة</label>
                        <input type="text" id="location" placeholder="الرياض، السعودية">
                    </div>
                    <div class="form-group">
                        <label>الطول (سم)</label>
                        <input type="number" id="height" placeholder="175">
                    </div>
                    <div class="form-group">
                        <label>رقم الهاتف</label>
                        <input type="tel" id="phone" placeholder="+966 50 123 4567">
                    </div>
                    <div class="form-group">
                        <label>البريد الإلكتروني</label>
                        <input type="email" id="email" placeholder="email@example.com">
                    </div>

                    <div class="section-title">التعليم</div>
                    <div class="form-group">
                        <label>المستوى الدراسي</label>
                        <select id="educationLevel">
                            <option value="">اختر المستوى</option>
                            <option value="ثانوية عامة">ثانوية عامة</option>
                            <option value="دبلوم">دبلوم</option>
                            <option value="بكالوريوس">بكالوريوس</option>
                            <option value="ماجستير">ماجستير</option>
                            <option value="دكتوراه">دكتوراه</option>
                        </select>
                    </div>

                    <div class="section-title">الشهادات الدراسية</div>
                    <div id="certificatesList" class="dynamic-list"></div>
                    <button class="btn btn-add" onclick="addCertificate()">➕ إضافة شهادة</button>

                    <div class="section-title">الخبرة المهنية</div>
                    <div id="experienceList" class="dynamic-list"></div>
                    <button class="btn btn-add" onclick="addExperience()">➕ إضافة خبرة</button>

                    <div class="section-title">المهارات</div>
                    <div class="form-group">
                        <textarea id="skills" placeholder="اكتب المهارات (كل مهارة في سطر)&#10;مثال:&#10;HTML & CSS&#10;JavaScript&#10;Python"></textarea>
                    </div>

                    <div class="section-title">الهوايات</div>
                    <div class="form-group">
                        <textarea id="hobbies" placeholder="اكتب الهوايات (كل هواية في سطر)&#10;مثال:&#10;القراءة&#10;السفر&#10;الرياضة"></textarea>
                    </div>
                </div>
            </div>

            <!-- معاينة السيرة الذاتية -->
            <div class="card">
                <div class="template-preview">
                    <div id="cvPreview" class="cv-preview template-blue">
                        <!-- سيتم إنشاء المعاينة هنا -->
                    </div>

                    <div class="loading" id="loading">
                        <div class="spinner"></div>
                        <p style="margin-top: 15px; font-weight: 600;">جاري التصدير...</p>
                    </div>

                    <div class="export-section">
                        <button class="btn btn-success" onclick="exportToPDF()" style="font-size: 1.1rem;">
                            📄 تحميل PDF
                        </button>
                        <button class="btn btn-info" onclick="exportToWord()" style="font-size: 1.1rem;">
                            📝 تحميل Word
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        let currentTemplate = 'blue';
        let photoDataUrl = null;

        // تحميل الصورة
        document.getElementById('photoInput').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    photoDataUrl = event.target.result;
                    document.getElementById('photoPreview').innerHTML =
                        `<img src="${photoDataUrl}" alt="صورة شخصية">`;
                    updatePreview();
                };
                reader.readAsDataURL(file);
            }
        });

        // اختيار القالب
        document.querySelectorAll('.template-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.template-option').forEach(opt =>
                    opt.classList.remove('active'));
                this.classList.add('active');
                currentTemplate = this.dataset.template;
                updatePreview();
            });
        });

        // إضافة شهادة
        function addCertificate() {
            const id = Date.now();
            const html = `
                <div class="dynamic-item" id="cert-${id}">
                    <button class="btn-remove" onclick="removeCertificate(${id})">×</button>
                    <input type="text" placeholder="اسم الشهادة" class="cert-name" oninput="updatePreview()">
                    <input type="text" placeholder="الجهة المانحة" class="cert-issuer" oninput="updatePreview()">
                    <input type="text" placeholder="السنة" class="cert-year" oninput="updatePreview()">
                </div>
            `;
            document.getElementById('certificatesList').insertAdjacentHTML('beforeend', html);
        }

        function removeCertificate(id) {
            document.getElementById(`cert-${id}`).remove();
            updatePreview();
        }

        // إضافة خبرة
        function addExperience() {
            const id = Date.now();
            const html = `
                <div class="dynamic-item" id="exp-${id}">
                    <button class="btn-remove" onclick="removeExperience(${id})">×</button>
                    <input type="text" placeholder="المسمى الوظيفي" class="exp-title" oninput="updatePreview()">
                    <input type="text" placeholder="اسم الشركة" class="exp-company" oninput="updatePreview()">
                    <input type="text" placeholder="الفترة (مثال: 2020 - 2023)" class="exp-period" oninput="updatePreview()">
                    <textarea placeholder="الوصف" class="exp-description" oninput="updatePreview()"></textarea>
                </div>
            `;
            document.getElementById('experienceList').insertAdjacentHTML('beforeend', html);
        }

        function removeExperience(id) {
            document.getElementById(`exp-${id}`).remove();
            updatePreview();
        }

        // تحديث المعاينة
        function updatePreview() {
            const data = collectData();
            const preview = document.getElementById('cvPreview');
            preview.className = `cv-preview template-${currentTemplate}`;
            preview.innerHTML = generateTemplate(data, currentTemplate);
        }

        function collectData() {
            const certificates = [];
            document.querySelectorAll('#certificatesList .dynamic-item').forEach(item => {
                const name = item.querySelector('.cert-name').value;
                const issuer = item.querySelector('.cert-issuer').value;
                const year = item.querySelector('.cert-year').value;
                if (name || issuer || year) {
                    certificates.push({ name, issuer, year });
                }
            });

            const experiences = [];
            document.querySelectorAll('#experienceList .dynamic-item').forEach(item => {
                const title = item.querySelector('.exp-title').value;
                const company = item.querySelector('.exp-company').value;
                const period = item.querySelector('.exp-period').value;
                const description = item.querySelector('.exp-description').value;
                if (title || company || period || description) {
                    experiences.push({ title, company, period, description });
                }
            });

            const skills = document.getElementById('skills').value
                .split('\n')
                .filter(s => s.trim());

            const hobbies = document.getElementById('hobbies').value
                .split('\n')
                .filter(h => h.trim());

            return {
                photo: photoDataUrl,
                fullName: document.getElementById('fullName').value || 'اسمك الكامل',
                title: document.getElementById('title').value || 'المسمى الوظيفي',
                birthDate: document.getElementById('birthDate').value,
                location: document.getElementById('location').value,
                height: document.getElementById('height').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                educationLevel: document.getElementById('educationLevel').value,
                certificates,
                experiences,
                skills,
                hobbies
            };
        }

        function generateTemplate(data, template) {
            if (template === 'blue') {
                return generateBlueTemplate(data);
            } else if (template === 'purple') {
                return generatePurpleTemplate(data);
            } else if (template === 'gold') {
                return generateGoldTemplate(data);
            } else if (template === 'green') {
                return generateGreenTemplate(data);
            } else if (template === 'red') {
                return generateRedTemplate(data);
            } else if (template === 'teal') {
                return generateTealTemplate(data);
            }
        }

        function generateBlueTemplate(data) {
            return `
                <div class="cv-header">
                    ${data.photo ? `<img src="${data.photo}" class="cv-photo" alt="صورة">` : ''}
                    <div class="cv-name">${data.fullName}</div>
                    <div style="font-size: 1.3rem; opacity: 0.9;">${data.title}</div>
                </div>
                <div class="cv-body">
                    ${generatePersonalInfo(data)}
                    ${generateEducation(data)}
                    ${generateCertificates(data)}
                    ${generateExperience(data)}
                    ${generateSkills(data)}
                    ${generateHobbies(data)}
                </div>
            `;
        }

        function generatePurpleTemplate(data) {
            return `
                <div class="cv-sidebar">
                    ${data.photo ? `<img src="${data.photo}" class="cv-photo" alt="صورة">` : ''}
                    <div class="cv-name">${data.fullName}</div>
                    <div style="opacity: 0.9; margin-bottom: 20px;">${data.title}</div>
                    <div class="sidebar-section-title">معلومات التواصل</div>
                    ${data.phone ? `<div class="cv-info-item">📱 ${data.phone}</div>` : ''}
                    ${data.email ? `<div class="cv-info-item">✉️ ${data.email}</div>` : ''}
                    ${data.location ? `<div class="cv-info-item">📍 ${data.location}</div>` : ''}
                    ${generateSkillsSidebar(data)}
                    ${generateHobbiesSidebar(data)}
                </div>
                <div class="cv-main">
                    ${generatePersonalInfoSimple(data)}
                    ${generateEducation(data)}
                    ${generateCertificates(data)}
                    ${generateExperience(data)}
                </div>
            `;
        }

        function generateGoldTemplate(data) {
            return `
                <div class="cv-header">
                    <div class="cv-header-content">
                        ${data.photo ? `<img src="${data.photo}" class="cv-photo" alt="صورة">` : ''}
                        <div>
                            <div class="cv-name">${data.fullName}</div>
                            <div style="font-size: 1.4rem; opacity: 0.95; margin-bottom: 15px;">${data.title}</div>
                            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                                ${data.phone ? `<span>📱 ${data.phone}</span>` : ''}
                                ${data.email ? `<span>✉️ ${data.email}</span>` : ''}
                                ${data.location ? `<span>📍 ${data.location}</span>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cv-body">
                    ${generatePersonalInfoSimple(data)}
                    ${generateEducation(data)}
                    ${generateCertificates(data)}
                    ${generateExperience(data)}
                    ${generateSkills(data)}
                    ${generateHobbies(data)}
                </div>
            `;
        }

        function generateGreenTemplate(data) {
            return `
                <div class="cv-header">
                    ${data.photo ? `<img src="${data.photo}" class="cv-photo" alt="صورة">` : ''}
                    <div class="cv-name">${data.fullName}</div>
                    <div style="font-size: 1.3rem; opacity: 0.95; margin-bottom: 15px;">${data.title}</div>
                    <div style="display: flex; gap: 25px; flex-wrap: wrap; justify-content: center;">
                        ${data.phone ? `<span>📱 ${data.phone}</span>` : ''}
                        ${data.email ? `<span>✉️ ${data.email}</span>` : ''}
                        ${data.location ? `<span>📍 ${data.location}</span>` : ''}
                    </div>
                </div>
                <div class="cv-body">
                    ${generatePersonalInfoSimple(data)}
                    ${generateEducation(data)}
                    ${generateCertificates(data)}
                    ${generateExperience(data)}
                    ${generateSkills(data)}
                    ${generateHobbies(data)}
                </div>
            `;
        }

        function generateRedTemplate(data) {
            return `
                <div class="cv-header">
                    ${data.photo ? `<img src="${data.photo}" class="cv-photo" alt="صورة">` : ''}
                    <div class="cv-name">${data.fullName}</div>
                    <div style="font-size: 1.4rem; opacity: 0.95; margin-bottom: 12px;">${data.title}</div>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; font-size: 1.05rem;">
                        ${data.phone ? `<span>📱 ${data.phone}</span>` : ''}
                        ${data.email ? `<span>✉️ ${data.email}</span>` : ''}
                        ${data.location ? `<span>📍 ${data.location}</span>` : ''}
                    </div>
                </div>
                <div class="cv-body">
                    ${generatePersonalInfoSimple(data)}
                    ${generateEducation(data)}
                    ${generateCertificates(data)}
                    ${generateExperience(data)}
                    ${generateSkills(data)}
                    ${generateHobbies(data)}
                </div>
            `;
        }

        function generateTealTemplate(data) {
            return `
                <div class="cv-sidebar">
                    ${data.photo ? `<img src="${data.photo}" class="cv-photo" alt="صورة">` : ''}
                    <div class="cv-name">${data.fullName}</div>
                    <div style="opacity: 0.95; margin-bottom: 20px; font-size: 1.15rem;">${data.title}</div>
                    <div class="sidebar-section-title">معلومات التواصل</div>
                    ${data.phone ? `<div class="cv-info-item">📱 ${data.phone}</div>` : ''}
                    ${data.email ? `<div class="cv-info-item">✉️ ${data.email}</div>` : ''}
                    ${data.location ? `<div class="cv-info-item">📍 ${data.location}</div>` : ''}
                    ${generateSkillsSidebar(data)}
                    ${generateHobbiesSidebar(data)}
                </div>
                <div class="cv-main">
                    ${generatePersonalInfoSimple(data)}
                    ${generateEducation(data)}
                    ${generateCertificates(data)}
                    ${generateExperience(data)}
                </div>
            `;
        }

        function generatePersonalInfo(data) {
            const info = [];
            if (data.birthDate) info.push(`تاريخ الميلاد: ${data.birthDate}`);
            if (data.location) info.push(`مكان الإقامة: ${data.location}`);
            if (data.height) info.push(`الطول: ${data.height} سم`);
            if (data.phone) info.push(`الهاتف: ${data.phone}`);
            if (data.email) info.push(`البريد الإلكتروني: ${data.email}`);
            if (info.length === 0) return '';
            return `
                <div class="cv-section">
                    <div class="cv-section-title">المعلومات الشخصية</div>
                    ${info.map(i => `<div class="cv-info-item">${i}</div>`).join('')}
                </div>
            `;
        }

        function generatePersonalInfoSimple(data) {
            const info = [];
            if (data.birthDate) info.push(`📅 ${data.birthDate}`);
            if (data.height) info.push(`📏 ${data.height} سم`);
            if (info.length === 0) return '';
            return `
                <div class="cv-section">
                    <div class="cv-section-title">معلومات إضافية</div>
                    <div style="display: flex; gap: 25px; flex-wrap: wrap;">
                        ${info.map(i => `<span class="cv-info-item">${i}</span>`).join('')}
                    </div>
                </div>
            `;
        }

        function generateEducation(data) {
            if (!data.educationLevel) return '';
            return `
                <div class="cv-section">
                    <div class="cv-section-title">التعليم</div>
                    <div class="cv-info-item"><strong>المستوى الدراسي:</strong> ${data.educationLevel}</div>
                </div>
            `;
        }

        function generateCertificates(data) {
            if (data.certificates.length === 0) return '';
            return `
                <div class="cv-section">
                    <div class="cv-section-title">الشهادات</div>
                    ${data.certificates.map(cert => `
                        <div class="cv-list-item">
                            <strong>${cert.name || 'شهادة'}</strong>
                            ${cert.issuer ? `<br>الجهة المانحة: ${cert.issuer}` : ''}
                            ${cert.year ? `<br>السنة: ${cert.year}` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        function generateExperience(data) {
            if (data.experiences.length === 0) return '';
            return `
                <div class="cv-section">
                    <div class="cv-section-title">الخبرة المهنية</div>
                    ${data.experiences.map(exp => `
                        <div class="cv-list-item" style="margin-bottom: 20px;">
                            <strong style="font-size: 1.1rem;">${exp.title || 'وظيفة'}</strong>
                            ${exp.company ? `<br><em>${exp.company}</em>` : ''}
                            ${exp.period ? `<br>📅 ${exp.period}` : ''}
                            ${exp.description ? `<br><p style="margin-top: 8px; line-height: 1.6;">${exp.description}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        function generateSkills(data) {
            if (data.skills.length === 0) return '';
            return `
                <div class="cv-section">
                    <div class="cv-section-title">المهارات</div>
                    <div>
                        ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            `;
        }

        function generateSkillsSidebar(data) {
            if (data.skills.length === 0) return '';
            return `
                <div class="sidebar-section-title">المهارات</div>
                ${data.skills.map(skill => `<div class="cv-info-item">• ${skill}</div>`).join('')}
            `;
        }

        function generateHobbies(data) {
            if (data.hobbies.length === 0) return '';
            return `
                <div class="cv-section">
                    <div class="cv-section-title">الهوايات</div>
                    <div>
                        ${data.hobbies.map(hobby => `<span class="skill-tag">${hobby}</span>`).join('')}
                    </div>
                </div>
            `;
        }

        function generateHobbiesSidebar(data) {
            if (data.hobbies.length === 0) return '';
            return `
                <div class="sidebar-section-title">الهوايات</div>
                ${data.hobbies.map(hobby => `<div class="cv-info-item">• ${hobby}</div>`).join('')}
            `;
        }

        // تصدير PDF محسّن ومُصلح
        async function exportToPDF() {
            const loading = document.getElementById('loading');
            const preview = document.getElementById('cvPreview');

            try {
                loading.classList.add('active');

                // إنشاء نسخة مستقلة للتصدير
                const exportDiv = document.createElement('div');
                exportDiv.style.position = 'absolute';
                exportDiv.style.left = '-9999px';
                exportDiv.style.top = '0';
                exportDiv.style.width = '800px';
                exportDiv.style.backgroundColor = '#ffffff';
                exportDiv.className = preview.className;
                exportDiv.innerHTML = preview.innerHTML;
                document.body.appendChild(exportDiv);

                // انتظار تحميل جميع الصور
                const images = exportDiv.getElementsByTagName('img');
                const imagePromises = Array.from(images).map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                });
                await Promise.all(imagePromises);

                // تحويل HTML إلى Canvas
                const canvas = await html2canvas(exportDiv, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: false,
                    backgroundColor: '#ffffff',
                    logging: false,
                    width: 800,
                    windowWidth: 800,
                    imageTimeout: 0
                });

                // إزالة النسخة المؤقتة
                document.body.removeChild(exportDiv);

                // إنشاء PDF
                const { jsPDF } = window.jspdf;
                const imgData = canvas.toDataURL('image/png');

                const pdfWidth = 210; // A4 width in mm
                const pdfHeight = 297; // A4 height in mm
                const imgWidth = pdfWidth;
                const imgHeight = (canvas.height * pdfWidth) / canvas.width;

                const pdf = new jsPDF('p', 'mm', 'a4');
                let heightLeft = imgHeight;
                let position = 0;

                // إضافة الصفحة الأولى
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;

                // إضافة صفحات إضافية إذا لزم الأمر
                while (heightLeft > 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pdfHeight;
                }

                // حفظ الملف
                const fullName = document.getElementById('fullName').value || 'السيرة_الذاتية';
                const fileName = `CV_${fullName.replace(/\s+/g, '_')}.pdf`;
                pdf.save(fileName);

                loading.classList.remove('active');
                showSuccessMessage('✅ تم تصدير ملف PDF بنجاح!');

            } catch (error) {
                console.error('خطأ في تصدير PDF:', error);
                loading.classList.remove('active');
                showErrorMessage('❌ فشل تصدير PDF. الرجاء المحاولة مرة أخرى.');
            }
        }

        // تصدير Word
        async function exportToWord() {
            const loading = document.getElementById('loading');
            const data = collectData();

            try {
                loading.classList.add('active');

                let htmlContent = `
                    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                    <head>
                        <meta charset='utf-8'>
                        <style>
                            body { font-family: 'Arial', 'Calibri', sans-serif; direction: rtl; }
                            h1 { color: #1e40af; font-size: 28px; margin-bottom: 10px; }
                            h2 { color: #3b82f6; font-size: 20px; margin-top: 20px; margin-bottom: 10px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; }
                            p { margin: 5px 0; line-height: 1.6; }
                            .info { margin-bottom: 8px; }
                            .skill { display: inline-block; background: #e0e7ff; color: #3b82f6; padding: 5px 12px; margin: 3px; border-radius: 15px; }
                        </style>
                    </head>
                    <body>
                        <h1>${data.fullName}</h1>
                        <p style="font-size: 18px; color: #64748b; margin-bottom: 20px;">${data.title}</p>
                `;

                // المعلومات الشخصية
                htmlContent += '<h2>المعلومات الشخصية</h2>';
                if (data.phone) htmlContent += `<p class="info">الهاتف: ${data.phone}</p>`;
                if (data.email) htmlContent += `<p class="info">البريد الإلكتروني: ${data.email}</p>`;
                if (data.location) htmlContent += `<p class="info">مكان الإقامة: ${data.location}</p>`;
                if (data.birthDate) htmlContent += `<p class="info">تاريخ الميلاد: ${data.birthDate}</p>`;
                if (data.height) htmlContent += `<p class="info">الطول: ${data.height} سم</p>`;

                // التعليم
                if (data.educationLevel) {
                    htmlContent += '<h2>التعليم</h2>';
                    htmlContent += `<p class="info">المستوى الدراسي: ${data.educationLevel}</p>`;
                }

                // الشهادات
                if (data.certificates.length > 0) {
                    htmlContent += '<h2>الشهادات</h2>';
                    data.certificates.forEach(cert => {
                        htmlContent += `<p class="info"><strong>${cert.name || 'شهادة'}</strong>`;
                        if (cert.issuer) htmlContent += `<br>الجهة المانحة: ${cert.issuer}`;
                        if (cert.year) htmlContent += `<br>السنة: ${cert.year}`;
                        htmlContent += '</p>';
                    });
                }

                // الخبرة
                if (data.experiences.length > 0) {
                    htmlContent += '<h2>الخبرة المهنية</h2>';
                    data.experiences.forEach(exp => {
                        htmlContent += `<p class="info"><strong>${exp.title || 'وظيفة'}</strong>`;
                        if (exp.company) htmlContent += `<br>${exp.company}`;
                        if (exp.period) htmlContent += `<br>الفترة: ${exp.period}`;
                        if (exp.description) htmlContent += `<br>${exp.description}`;
                        htmlContent += '</p><br>';
                    });
                }

                // المهارات
                if (data.skills.length > 0) {
                    htmlContent += '<h2>المهارات</h2><p>';
                    data.skills.forEach(skill => {
                        htmlContent += `<span class="skill">${skill}</span> `;
                    });
                    htmlContent += '</p>';
                }

                // الهوايات
                if (data.hobbies.length > 0) {
                    htmlContent += '<h2>الهوايات</h2><p>';
                    data.hobbies.forEach(hobby => {
                        htmlContent += `<span class="skill">${hobby}</span> `;
                    });
                    htmlContent += '</p>';
                }

                htmlContent += '</body></html>';

                const blob = new Blob(['\ufeff', htmlContent], {
                    type: 'application/msword'
                });

                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                const fileName = `CV_${document.getElementById('fullName').value.replace(/\s+/g, '_') || 'السيرة_الذاتية'}.doc`;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                loading.classList.remove('active');
                showSuccessMessage('✅ تم تصدير السيرة الذاتية Word بنجاح!');

            } catch (error) {
                console.error('Error exporting Word:', error);
                loading.classList.remove('active');
                showErrorMessage('❌ حدث خطأ في تصدير Word: ' + error.message);
            }
        }

        function showSuccessMessage(message) {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 30px 50px;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
                z-index: 10000;
                font-size: 1.3rem;
                font-weight: 700;
                text-align: center;
            `;
            modal.textContent = message;
            document.body.appendChild(modal);
            setTimeout(() => modal.remove(), 2500);
        }

        function showErrorMessage(message) {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                color: white;
                padding: 30px 50px;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
                z-index: 10000;
                font-size: 1.2rem;
                font-weight: 700;
                text-align: center;
                max-width: 500px;
            `;
            modal.textContent = message;
            document.body.appendChild(modal);
            setTimeout(() => modal.remove(), 4000);
        }

        // إضافة استماع لتحديث المعاينة
        document.querySelectorAll('input, textarea, select').forEach(element => {
            element.addEventListener('input', updatePreview);
        });

        // تحديث المعاينة عند تحميل الصفحة
        updatePreview();

        // دعم الوضع الداكن
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });
    </script>
</body>
</html>
