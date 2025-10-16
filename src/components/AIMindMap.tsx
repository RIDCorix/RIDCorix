'use client'

import { useState, useEffect, useCallback } from 'react'
import { Wrench, Database, GitBranch, Activity } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { Card, CardContent } from '@/components/ui/card'
import ReactFlow, { Background, Controls, MiniMap, Node, Edge, useNodesState, useEdgesState } from 'reactflow'
import 'reactflow/dist/style.css'

interface AITechData {
  id: string
  title: string
  titleZh: string
  description: string
  descriptionZh: string
  detailDescription: string
  detailDescriptionZh: string
  icon: React.ReactNode
  color: string
  features: string[]
  featuresZh: string[]
}

export default function AIMindMap() {
  const { language } = useLanguage()
  const [activeId, setActiveId] = useState('mcp')
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // AI 技術資料（用於細節面板）
  const techData: AITechData[] = [
    {
      id: 'mcp',
      title: 'MCP Integration',
      titleZh: 'MCP 整合',
      description: 'Custom servers & tools for AI-human collaboration',
      descriptionZh: '客製化伺服器與工具實現 AI 協作',
      detailDescription: 'Developed custom Model Context Protocol (MCP) servers and tools that enable seamless AI-human collaboration. Built intelligent workflows and context-aware interactions that bridge the gap between AI capabilities and human needs.',
      detailDescriptionZh: '開發客製化的 Model Context Protocol (MCP) 伺服器與工具，實現 AI 與人類的無縫協作。打造智慧化工作流程與情境感知互動體驗，橋接 AI 能力與人類需求之間的鴻溝。',
      icon: <Wrench className="w-6 h-6" />,
      color: 'from-cyan-500 to-blue-600',
      features: ['Custom MCP Servers', 'Tool Integration', 'Context Management', 'Workflow Automation'],
      featuresZh: ['客製化 MCP 伺服器', '工具整合', '情境管理', '工作流程自動化']
    },
    {
      id: 'rag',
      title: 'RAG Systems',
      titleZh: 'RAG 系統',
      description: 'Vector databases & knowledge retrieval',
      descriptionZh: '向量資料庫與知識檢索',
      detailDescription: 'Implemented Retrieval-Augmented Generation (RAG) systems for enterprise knowledge bases. Combined vector databases with Large Language Models to provide accurate, contextual information retrieval and generation.',
      detailDescriptionZh: '為企業知識庫實作檢索增強生成 (RAG) 系統。結合向量資料庫與大型語言模型，提供精準的情境化資訊檢索與生成服務。',
      icon: <Database className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-600',
      features: ['Vector Embeddings', 'Semantic Search', 'Knowledge Base Integration', 'LLM Enhancement'],
      featuresZh: ['向量嵌入', '語義搜尋', '知識庫整合', 'LLM 增強']
    },
    {
      id: 'langgraph',
      title: 'LangGraph',
      titleZh: 'LangGraph',
      description: 'Multi-agent systems & workflows',
      descriptionZh: '多代理系統與工作流程',
      detailDescription: 'Architected complex multi-agent systems using LangGraph. Created stateful, cyclic workflows for advanced AI applications and autonomous agents that can handle sophisticated task orchestration.',
      detailDescriptionZh: '使用 LangGraph 架構複雜的多代理系統。創建具狀態管理的循環工作流程，實現進階 AI 應用與自主代理，能夠處理複雜的任務編排。',
      icon: <GitBranch className="w-6 h-6" />,
      color: 'from-orange-500 to-red-600',
      features: ['Multi-Agent Coordination', 'State Management', 'Cyclic Workflows', 'Task Orchestration'],
      featuresZh: ['多代理協調', '狀態管理', '循環工作流程', '任務編排']
    },
    {
      id: 'monitoring',
      title: 'AI Monitoring',
      titleZh: 'AI 監控',
      description: 'Performance tracking & observability',
      descriptionZh: '效能追蹤與可觀測性',
      detailDescription: 'Built comprehensive monitoring and observability solutions for LLM applications. Track performance metrics, costs, and quality to ensure reliable AI systems in production environments.',
      detailDescriptionZh: '建構 LLM 應用的完整監控與可觀測性方案。追蹤效能指標、成本與品質，確保 AI 系統在生產環境中穩定可靠運行。',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-indigo-500 to-violet-600',
      features: ['Real-time Metrics', 'Cost Tracking', 'Quality Assurance', 'Production Monitoring'],
      featuresZh: ['即時指標', '成本追蹤', '品質保證', '生產監控']
    }
  ]

  // React Flow 節點定義
  const initialNodes: Node[] = [
    {
      id: 'mcp',
      type: 'default',
      position: { x: 50, y: 50 },
      data: { label: language === 'zh' ? 'MCP 整合' : 'MCP Integration' },
      style: { 
        width: 180, 
        height: 80, 
        borderRadius: 16, 
        background: 'linear-gradient(to right, #06b6d4, #2563eb)', 
        color: '#fff', 
        fontWeight: 700, 
        fontSize: 16, 
        boxShadow: '0 4px 24px rgba(6, 182, 212, 0.4)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }
    },
    {
      id: 'rag',
      type: 'default',
      position: { x: 350, y: 50 },
      data: { label: language === 'zh' ? 'RAG 系統' : 'RAG Systems' },
      style: { 
        width: 180, 
        height: 80, 
        borderRadius: 16, 
        background: 'linear-gradient(to right, #10b981, #0d9488)', 
        color: '#fff', 
        fontWeight: 700, 
        fontSize: 16, 
        boxShadow: '0 4px 24px rgba(16, 185, 129, 0.4)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }
    },
    {
      id: 'langgraph',
      type: 'default',
      position: { x: 50, y: 250 },
      data: { label: 'LangGraph' },
      style: { 
        width: 180, 
        height: 80, 
        borderRadius: 16, 
        background: 'linear-gradient(to right, #f97316, #dc2626)', 
        color: '#fff', 
        fontWeight: 700, 
        fontSize: 16, 
        boxShadow: '0 4px 24px rgba(249, 115, 22, 0.4)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }
    },
    {
      id: 'monitoring',
      type: 'default',
      position: { x: 350, y: 250 },
      data: { label: language === 'zh' ? 'AI 監控' : 'AI Monitoring' },
      style: { 
        width: 180, 
        height: 80, 
        borderRadius: 16, 
        background: 'linear-gradient(to right, #6366f1, #8b5cf6)', 
        color: '#fff', 
        fontWeight: 700, 
        fontSize: 16, 
        boxShadow: '0 4px 24px rgba(99, 102, 241, 0.4)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }
    }
  ]

  // React Flow 邊定義
  const initialEdges: Edge[] = [
    { id: 'e1', source: 'mcp', target: 'rag', animated: true, style: { stroke: '#a855f7', strokeWidth: 2 } },
    { id: 'e2', source: 'mcp', target: 'langgraph', animated: true, style: { stroke: '#a855f7', strokeWidth: 2 } },
    { id: 'e3', source: 'rag', target: 'monitoring', animated: true, style: { stroke: '#a855f7', strokeWidth: 2 } },
    { id: 'e4', source: 'langgraph', target: 'monitoring', animated: true, style: { stroke: '#a855f7', strokeWidth: 2 } }
  ]

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // 自動播放
  useEffect(() => {
    if (!isAutoPlaying) return
    const ids = techData.map(t => t.id)
    const interval = setInterval(() => {
      setActiveId(prev => {
        const idx = ids.indexOf(prev)
        return ids[(idx + 1) % ids.length]
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, techData])

  // 點擊節點處理
  const handleNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setIsAutoPlaying(false)
    setActiveId(node.id)
  }, [])

  // 高亮選中節點
  useEffect(() => {
    setNodes(nds => 
      nds.map(n => ({
        ...n,
        style: {
          ...n.style,
          transform: n.id === activeId ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.3s ease-in-out',
          boxShadow: n.id === activeId 
            ? '0 8px 32px rgba(168, 85, 247, 0.65)' 
            : (n.style?.boxShadow || '0 4px 24px rgba(0,0,0,0.4)'),
          border: n.id === activeId
            ? '3px solid rgba(168, 85, 247, 0.9)'
            : '2px solid rgba(255, 255, 255, 0.3)'
        }
      }))
    )
  }, [activeId, setNodes])

  const activeTech = techData.find(t => t.id === activeId)!

  return (
    <div className="relative w-full scroll-fade-in">
      <div className="grid lg:grid-cols-[1fr,1.2fr] gap-6 lg:gap-10 items-start">
        
        {/* React Flow 視覺化區塊 */}
        <div className="relative h-[500px] lg:h-[650px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl overflow-hidden order-2 lg:order-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={handleNodeClick}
            fitView
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            nodesDraggable={false}
            className="w-full h-full"
            minZoom={0.8}
            maxZoom={1.2}
          >
            <Background color="#a855f755" gap={32} />
            <MiniMap nodeColor={() => '#a855f7'} nodeStrokeWidth={3} pannable zoomable />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>

        {/* 細節面板 */}
        <div className="order-1 lg:order-2">
          <Card className="h-full lg:h-[650px] overflow-hidden border-2">
            <CardContent className="p-0 h-full flex flex-col">
              
              {/* 圖示區塊 */}
              <div className="relative h-72 lg:h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${activeTech.color} opacity-30`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`inline-flex p-10 lg:p-14 rounded-3xl bg-gradient-to-br ${activeTech.color} text-white shadow-2xl transition-transform duration-500`}
                    style={{
                      animation: 'iconPulse 3s ease-in-out infinite'
                    }}
                  >
                    <div className="scale-[3] lg:scale-[4]">
                      {activeTech.icon}
                    </div>
                  </div>
                </div>
              </div>

              {/* 內容區塊 */}
              <div className="flex-1 p-6 lg:p-8 overflow-y-auto bg-white dark:bg-gray-900">
                <div className="space-y-5">
                  
                  {/* 標題 */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${activeTech.color} text-white shadow-lg`}>
                        {activeTech.icon}
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                        {language === 'zh' ? activeTech.titleZh : activeTech.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {language === 'zh' ? activeTech.descriptionZh : activeTech.description}
                    </p>
                  </div>

                  {/* 詳細說明 */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <div className={`w-1 h-5 rounded-full bg-gradient-to-br ${activeTech.color}`}></div>
                      {language === 'zh' ? '詳細說明' : 'Overview'}
                    </h4>
                    <p className="text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {language === 'zh' ? activeTech.detailDescriptionZh : activeTech.detailDescription}
                    </p>
                  </div>

                  {/* 核心功能 */}
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <div className={`w-1 h-5 rounded-full bg-gradient-to-br ${activeTech.color}`}></div>
                      {language === 'zh' ? '核心功能' : 'Key Features'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(language === 'zh' ? activeTech.featuresZh : activeTech.features).map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 lg:p-4 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 group"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${activeTech.color} mt-1.5 flex-shrink-0 group-hover:scale-150 transition-transform`}></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 進度指示器 */}
                  <div className="pt-4 mt-2 border-t-2 border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        {techData.findIndex(t => t.id === activeId) + 1} / {techData.length}
                      </span>
                      <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          isAutoPlaying 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {isAutoPlaying ? (language === 'zh' ? '⏸ 暫停' : '⏸ Pause') : (language === 'zh' ? '▶ 播放' : '▶ Play')}
                      </button>
                    </div>
                  </div>
                  
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
      </div>

      <style jsx>{`
        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}
