# Deployment Guide for AgriPrice

This project is split into two parts: a **React Frontend** and a **Python (FastAPI) Backend**. You need to deploy them separately.

## 1. Deploying the Backend (Python/FastAPI)
We recommend **Render** or **Railway** for free hosting.

### Option A: Render (Recommended)
1. Go to [dashboard.render.com](https://dashboard.render.com/) and click **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Configure the service:
   - **Name**: `agri-price-backend`
   - **Root Directory**: `backend` (Important!)
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Click **Deploy**.
5. Once deployed, copy the **onrender.com URL** (e.g., `https://agri-price-backend.onrender.com`).

---

## 2. Deploying the Frontend (React/Vite)
We recommend **Vercel**.

1. Go to [vercel.com](https://vercel.com/) and click **Add New** -> **Project**.
2. Import your `agri-price` repository.
3. Vercel will auto-detect Vite. The default settings are usually correct:
   - **Build Command**: `vite build` or `npm run build`
   - **Output Directory**: `dist`
4. **Environment Variables**:
   - Expand the "Environment Variables" section.
   - Key: `VITE_API_URL`
   - Value: Your Backend URL from Step 1 (e.g., `https://agri-price-backend.onrender.com`).
   *(Do not add a trailing slash `/`)*
5. Click **Deploy**.

## 3. Verification
1. Open your new Vercel URL.
2. Go to **Live Prices**.
3. Check the console (F12) to ensure it's fetching data from your generic backend URL, not localhost.
