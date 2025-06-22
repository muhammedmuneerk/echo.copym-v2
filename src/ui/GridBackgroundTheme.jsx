import { motion } from "framer-motion";

const BackgroundTheme = ({ children }) => {
  return (
<div className="bg-gradient-to-b from-[#050505] to-[#0a0a0a] text-white min-h-screen relative overflow-hidden font-sans">
      {/* Enhanced Layered Background Elements - DECREASED OPACITY BY 1/4 */}

      {/* Grid Background - Decreased opacity from 0.2 to 0.15 and stroke width from 0.8 to 0.6 */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMxMGI5ODEiIHN0cm9rZS13aWR0aD0iMC42Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiBvcGFjaXR5PSIwLjE1Ii8+PC9zdmc+')]"></div>

      {/* Hexagonal pattern overlay - Decreased opacity from 0.25 to 0.1875 and stroke width from 2.4 to 1.8 */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4NCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDg0IDQ4Ij48ZGVmcz48cGF0dGVybiBpZD0iaGV4IiB3aWR0aD0iODQiIGhlaWdodD0iNDgiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InNjYWxlKDAuMTYpIj48cGF0aCBkPSJNNDIgMTIgNzMuODIzIDMxIDczLjgyMyA2OSA0MiA4OCAxMC4xNzcgNjkgMTAuMTc3IDMxeiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTBiOTgxIiBzdHJva2Utd2lkdGg9IjEuOCIgLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjaGV4KSIgb3BhY2l0eT0iMC4xODc1IiAvPjwvc3ZnPg==')] opacity-60"></div>

      {/* Diagonal grid overlay - Fixed with enhanced visibility */}
      {/* <div className="fixed inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRpYWdvbmFsLWdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTYwIDAgTDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIxLjIiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZGlhZ29uYWwtZ3JpZCkiLz48L3N2Zz4=')]"></div> */}

      {/* Diagonal grid overlay - Balanced opacity consistent with other layers */}
      <div className="fixed inset-0 opacity-[0.225] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRpYWdvbmFsLWdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTYwIDAgTDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIxLjIiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZGlhZ29uYWwtZ3JpZCkiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]"></div>

      {/* Animated gradient overlay - Decreased color intensity from 0.2 to 0.15 */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-tr from-emerald-900/[0.1875] via-transparent to-blue-900/[0.1875]"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(6,78,59,0.15) 0%, rgba(0,0,0,0) 50%, rgba(12,74,110,0.15) 100%)",
            "linear-gradient(135deg, rgba(12,74,110,0.15) 0%, rgba(0,0,0,0) 50%, rgba(6,78,59,0.15) 100%)",
            "linear-gradient(135deg, rgba(6,78,59,0.15) 0%, rgba(0,0,0,0) 50%, rgba(12,74,110,0.15) 100%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Sophisticated noise texture overlay - Decreased opacity from 0.12 to 0.09 */}
      <div className="fixed inset-0 opacity-[0.09] mix-blend-soft-light bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuMDEiIG51bU9jdGF2ZXM9IjUiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]"></div>

      {/* Circuit board pattern overlay - Decreased opacity from 0.3 to 0.225 and stroke width from 1.8 to 1.35 */}
      <div className="fixed inset-0 opacity-[0.225] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJjaXJjdWl0IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTEwIDEwIEw1MCAxMCBMNTAgNTAgTDkwIDUwIEw5MCA5MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTBiOTgxIiBzdHJva2Utd2lkdGg9IjEuMzUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik05MCAxMCBMNTAgMTAgTDUwIDUwIEwxMCA1MCBMMTAgOTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIxLjM1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIyLjYyNSIgZmlsbD0iIzEwYjk4MSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iMTAiIHI9IjIuNjI1IiBmaWxsPSIjMTBiOTgxIi8+PGNpcmNsZSBjeD0iOTAiIGN5PSIxMCIgcj0iMi42MjUiIGZpbGw9IiMxMGI5ODEiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjUwIiByPSIyLjYyNSIgZmlsbD0iIzEwYjk4MSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjIuNjI1IiBmaWxsPSIjMTBiOTgxIi8+PGNpcmNsZSBjeD0iOTAiIGN5PSI1MCIgcj0iMi42MjUiIGZpbGw9IiMxMGI5ODEiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjkwIiByPSIyLjYyNSIgZmlsbD0iIzEwYjk4MSIvPjxjaXJjbGUgY3g9IjkwIiBjeT0iOTAiIHI9IjIuNjI1IiBmaWxsPSIjMTBiOTgxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2NpcmN1aXQpIi8+PC9zdmc+')]"></div>

      {/* Vignette shadow overlay - Decreased opacity from 0.3 to 0.225 */}
      <div
        className="fixed inset-0 pointer-events-none bg-radial-gradient opacity-[0.225] z-[1]"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.15) 70%, rgba(0, 0, 0, 0.375) 100%)",
        }}
      ></div>

      {/* Optional color tint - Decreased opacity from 0.05 to 0.0375 */}
      <div className="fixed inset-0 bg-emerald-500/[0.0375] mix-blend-overlay"></div>

      {children}
      
    </div>
  );
};

export default BackgroundTheme;