import type { Application } from '../../domain/application'
import { getResourcesByIds } from '../../utils/getResourcesByIds'
import { getRadialLayout } from '../../utils/getRadialLayout'
import styles from './ApplicationGraph.module.css'
import type { Resource } from '../../domain/resource'

type ApplicationGraphProps = {
  application: Application
  resources: Resource[]
}

const graphSize = {
  width: 720,
  height: 480,
  centerX: 360,
  centerY: 240,
  radius: 200,
}

export function ApplicationGraph({ application, resources }: ApplicationGraphProps) {
  const applicationResources = getResourcesByIds(resources, application.resourceIds)
  const resourcePositions = getRadialLayout(
    application.resourceIds,
    graphSize,
  )

  return (
    <section className={styles.graph}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${graphSize.width} ${graphSize.height}`}
        role="img"
        aria-label={`${application.name} connected to ${applicationResources.length} resources`}
      >
        <g className={styles.edges} aria-hidden="true">
          {resourcePositions.map((position) => (
            <line
              key={position.id}
              x1={graphSize.centerX}
              y1={graphSize.centerY}
              x2={position.x}
              y2={position.y}
            />
          ))}
        </g>

        <g className={styles.applicationNode}>
          <rect
            x={graphSize.centerX - 90}
            y={graphSize.centerY - 34}
            width="180"
            height="68"
            rx="10"
          />
          <text x={graphSize.centerX} y={graphSize.centerY - 6} textAnchor="middle">
            Application
          </text>
          <text x={graphSize.centerX} y={graphSize.centerY + 16} textAnchor="middle">
            {application.name}
          </text>
        </g>

        {resourcePositions.map((position) => {
          const resource = applicationResources.find(({ id }) => id === position.id)

          if (!resource) {
            return null
          }

          return (
            <g
              key={resource.id}
              className={styles.resourceNode}
              transform={`translate(${position.x} ${position.y})`}
            >
              <title>{resource.name + ' - ' + resource.type}</title>
              <rect x="-76" y="-28" width="152" height="56" rx="8" />
              <text y="-5" textAnchor="middle">
                {resource.name}
              </text>
              <text y="14" textAnchor="middle">
                {resource.type}
              </text>
            </g>
          )
        })}
      </svg>
    </section>
  )
}
