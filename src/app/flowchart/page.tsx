'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function FlowchartPage() {
  const flowchartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    });

    const flowchart = `
flowchart TD
    classDef mainPage fill:#f9f,stroke:#333,stroke-width:2px
    classDef validationPoint fill:#f96,stroke:#333,stroke-width:2px
    classDef errorPoint fill:#f66,stroke:#333,stroke-width:2px

    Accueil["Accueil 🚀 (Load: fast)"]
    CatalogueDeVins["Catalogue de Vins ⏳ (Load: medium)"]
    FicheDetaillee["Fiche Détaillee 🚀 (Load: fast)"]
    Contact["Contact"]

    class Accueil mainPage
    class CatalogueDeVins mainPage
    class FicheDetaillee mainPage
    class Contact mainPage

    Validation1((Authentification requise)):::validationPoint
    Validation2((Authentification requise)):::validationPoint
    Validation3((Authentification requise)):::validationPoint

    Erreur1((Erreur de chargement)):::errorPoint
    Erreur2((Indisponibilité des détails)):::errorPoint
    Erreur3((Problème de chargement)):::errorPoint

    Accueil -- Clic sur 'Catalogue de vins' --> CatalogueDeVins
    CatalogueDeVins -- Clic sur une bouteille --> FicheDetaillee
    FicheDetaillee -- Clic sur 'Contact' --> Contact

    Accueil --> Validation1
    CatalogueDeVins --> Validation2
    FicheDetaillee --> Validation3

    Accueil -- Erreur de chargement --> Erreur1
    CatalogueDeVins -- Indisponibilité des détails --> Erreur2
    FicheDetaillee -- Problème de chargement --> Erreur3
`;

    if (flowchartRef.current) {
      const tempId = 'flowchart-' + Math.random().toString(36).substring(2, 9);

      // Use Mermaid v10+ Promise-based API
      mermaid
        .render(tempId, flowchart)
        .then(({ svg }) => {
          if (flowchartRef.current) {
            flowchartRef.current.innerHTML = svg;
          }
        })
        .catch((err) => {
          console.error('Mermaid render error:', err);
        });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Flowchart Widget</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div ref={flowchartRef}></div>
        </div>
      </div>
    </div>
  );
}
