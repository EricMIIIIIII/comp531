import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {
    var width = 800;
    var length = 800;
    var canvas ={width,length}

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // check position, velocity, acceleration, mass
        expect(p.position).to.be.ok
        expect(p.velocity).to.be.ok
        expect(p.acceleration).to.be.ok
        expect(p.mass).to.be.ok
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0, canvas)
        expect(position).to.eql([1.5, 0.5])
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0, canvas) // dt is different here
        expect(position).to.eql([2.0, 0.0])
    })

    it('should update the velocity by the acceleration', () => {
        // similar to the previous check
        const p = particle({ velocity: [0.5, -0.5], acceleration: [1,1.5]})
        const { velocity } = update(p, 2.0, canvas) // dt is different here
        expect(velocity).to.eql([2.5, 2.5])
    })

    it('particles should wrap around the world', () => {
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides
        const p = particle({position: [900,900], velocity:[2,2] })
        const {position} = update(p,1.0,canvas)
        expect(position[0]>=0).to.be.ok
        expect(position[0]<=800).to.be.ok
        expect(position[1]>=0).to.be.ok
        expect(position[1]<=800).to.be.ok
    })

})
