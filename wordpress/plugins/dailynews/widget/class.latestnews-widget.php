<?php
/**
 * @package Latestnews
 * @subpackage Administration
 */
class Latestnews_Widget extends WP_Widget {

	/**
	 * constructor 	 * 
	*/
    function __construct() {
		load_plugin_textdomain( 'latestnews' );
		
		parent::__construct(
			'latestnews_widget',
			__( 'Latestnews Widget' , 'latestnews'),
			array( 'description' => __( 'Display the Latest news in this widget' , 'latestnews') )
		);		
	}
	
	/**
	 * @param array $args $instance
	 */
    function widget( $args, $instance ) {
        wp_enqueue_style( 'latestnews-style', plugins_url('latestnewswidget.css', __FILE__) );

        if ( ! isset( $instance['title'] ) ) {
			$instance['title'] = __( 'Latest News' , 'latestnews' );
		}

		echo $args['before_widget'];
		if ( ! empty( $instance['title'] ) ) {
			echo $args['before_title'];
			echo esc_html( $instance['title'] );
			echo $args['after_title'];
        }
        echo LatestNews::get_news_google();
        echo $args['after_widget'];
    }

}
class Latestnews_Widget1 extends WP_Widget {

	/**
	 * constructor 	 * 
	*/
    function __construct() {
		load_plugin_textdomain( 'latestnews' );
		
		parent::__construct(
			'latestnews_widget_content',
			__( 'Latestnews Widget Content' , 'latestnews'),
			array( 'description' => __( 'Display the Latest news for content area' , 'latestnews') )
		);		
	}
	
	/**
	 * @param array $args $instance
	 */
    function widget( $args, $instance ) {
        wp_enqueue_style( 'latestnews-style', plugins_url('latestnewswidget.css', __FILE__) );

        if ( ! isset( $instance['title'] ) ) {
			$instance['title'] = __( '' , 'latestnews' );
		}

		echo $args['before_widget'];
		if ( ! empty( $instance['title'] ) ) {
			echo $args['before_title'];
			echo esc_html( $instance['title'] );
			echo $args['after_title'];
        }
        echo LatestNews::get_news_google_main();
        echo $args['after_widget'];
    }

}

/**
 * register widget wp hook 
 */
function latestnews_register_widgets() {
	register_widget( 'Latestnews_Widget' );
	register_widget( 'Latestnews_Widget1' );
}

/**
 * wp hook add action
 */
add_action( 'widgets_init', 'latestnews_register_widgets' );
