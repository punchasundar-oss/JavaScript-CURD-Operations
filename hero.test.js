/**
 * Hero Component Tests
 * 
 * Simple browser-based tests for the Hero component.
 * Run in browser console: HeroTests.run()
 */

const HeroTests = (function() {
    'use strict';

    const results = [];

    function assert(condition, message) {
        if (condition) {
            results.push({ status: 'PASS', message });
            console.log('  ✓ ' + message);
        } else {
            results.push({ status: 'FAIL', message });
            console.error('  ✗ ' + message);
        }
    }

    function test(name, fn) {
        console.log('\n' + name);
        console.log('-'.repeat(40));
        try {
            fn();
        } catch (e) {
            results.push({ status: 'ERROR', message: name + ': ' + e.message });
            console.error('  ERROR: ' + e.message);
        }
    }

    return {
        run() {
            results.length = 0;
            console.log('\n' + '='.repeat(50));
            console.log('HERO COMPONENT TESTS');
            console.log('='.repeat(50));

            // Test 1: Component exists
            test('Component Initialization', () => {
                assert(typeof Hero !== 'undefined', 'Hero component is defined');
                assert(typeof Hero.init === 'function', 'Hero.init is a function');
                assert(typeof Hero.getConfig === 'function', 'Hero.getConfig is a function');
                assert(typeof Hero.update === 'function', 'Hero.update is a function');
            });

            // Test 2: Default configuration
            test('Default Configuration', () => {
                const config = Hero.getConfig();
                assert(config.headline === 'Build Smarter Digital Products', 
                    'Default headline is correct');
                assert(config.subheadline.includes('We design and engineer'), 
                    'Default subheadline is correct');
                assert(config.primaryCTA.label === 'Get Started', 
                    'Primary CTA label is correct');
                assert(config.primaryCTA.action === 'scroll', 
                    'Primary CTA action is scroll');
                assert(config.primaryCTA.target === '#contact', 
                    'Primary CTA target is #contact');
                assert(config.secondaryCTA.label === 'Talk to Us', 
                    'Secondary CTA label is correct');
                assert(config.secondaryCTA.action === 'navigate', 
                    'Secondary CTA action is navigate');
                assert(config.secondaryCTA.target === '/booking', 
                    'Secondary CTA target is /booking');
            });

            // Test 3: DOM Elements
            test('DOM Elements Rendered', () => {
                const hero = document.getElementById('hero');
                assert(hero !== null, 'Hero section exists in DOM');
                
                const headline = document.querySelector('.hero-headline');
                assert(headline !== null, 'Headline element exists');
                assert(headline.textContent === 'Build Smarter Digital Products', 
                    'Headline text is correct');

                const subheadline = document.querySelector('.hero-subheadline');
                assert(subheadline !== null, 'Subheadline element exists');

                const primaryCTA = document.querySelector('[data-hero-action="get-started"]');
                assert(primaryCTA !== null, 'Primary CTA button exists');
                assert(primaryCTA.textContent.trim() === 'Get Started', 
                    'Primary CTA text is correct');

                const secondaryCTA = document.querySelector('[data-hero-action="talk-to-us"]');
                assert(secondaryCTA !== null, 'Secondary CTA button exists');
                assert(secondaryCTA.textContent.trim() === 'Talk to Us', 
                    'Secondary CTA text is correct');

                const image = document.querySelector('.hero-image');
                assert(image !== null, 'Hero image exists');
                assert(image.hasAttribute('alt'), 'Image has alt attribute');
                assert(image.hasAttribute('width'), 'Image has width attribute');
                assert(image.hasAttribute('height'), 'Image has height attribute');
            });

            // Test 4: Accessibility
            test('Accessibility Features', () => {
                const hero = document.getElementById('hero');
                assert(hero.hasAttribute('aria-labelledby'), 
                    'Hero section has aria-labelledby');

                const headline = document.querySelector('.hero-headline');
                assert(headline.id === 'hero-heading', 
                    'Headline has correct id for aria-labelledby');

                const h1s = document.querySelectorAll('h1');
                assert(h1s.length === 1, 'Only one h1 element on page');

                const primaryCTA = document.querySelector('[data-hero-action="get-started"]');
                assert(primaryCTA.tagName === 'BUTTON', 'Primary CTA is a button element');
                assert(primaryCTA.getAttribute('type') === 'button', 
                    'Primary CTA has type="button"');

                const secondaryCTA = document.querySelector('[data-hero-action="talk-to-us"]');
                assert(secondaryCTA.tagName === 'BUTTON', 'Secondary CTA is a button element');
            });

            // Test 5: Configuration Updates
            test('Configuration Updates', () => {
                const originalHeadline = Hero.getConfig().headline;
                
                Hero.update({ headline: 'Test Headline' });
                const newConfig = Hero.getConfig();
                assert(newConfig.headline === 'Test Headline', 
                    'Headline updates correctly');

                // Reset to original
                Hero.update({ headline: originalHeadline });
                const resetConfig = Hero.getConfig();
                assert(resetConfig.headline === originalHeadline, 
                    'Headline resets correctly');
            });

            // Summary
            console.log('\n' + '='.repeat(50));
            const passed = results.filter(r => r.status === 'PASS').length;
            const failed = results.filter(r => r.status === 'FAIL').length;
            const errors = results.filter(r => r.status === 'ERROR').length;
            console.log(`Results: ${passed} passed, ${failed} failed, ${errors} errors`);
            console.log('='.repeat(50) + '\n');

            return { passed, failed, errors, results };
        },

        // Quick smoke test
        smoke() {
            console.log('\n🔍 Running smoke test...');
            const checks = [
                ['Hero defined', typeof Hero !== 'undefined'],
                ['Hero.init exists', typeof Hero?.init === 'function'],
                ['DOM ready', document.readyState === 'complete' || document.readyState === 'interactive'],
                ['Hero element exists', document.getElementById('hero') !== null],
                ['Headline exists', document.querySelector('.hero-headline') !== null],
                ['CTAs exist', document.querySelectorAll('[data-hero-action]').length === 2]
            ];

            let pass = 0, fail = 0;
            checks.forEach(([name, result]) => {
                if (result) {
                    console.log(`  ✓ ${name}`);
                    pass++;
                } else {
                    console.log(`  ✗ ${name}`);
                    fail++;
                }
            });

            console.log(`\nSmoke test: ${pass}/${checks.length} checks passed`);
            return fail === 0;
        }
    };
})();

// Auto-run smoke test if DOM is ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => HeroTests.smoke(), 100);
} else {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => HeroTests.smoke(), 100);
    });
}
