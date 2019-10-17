<div id="latestnews-plugin-container">	
	<div class="latestnews-content">
		<?php if ( LatestNews::get_api_key() ) { ?>
			<h3>The Google news API key: </h3>
		<?php } ?>
		<?php if ( ! empty( $notices ) ) { ?>
			<?php foreach ( $notices as $notice ) { ?>
				<?php LatestNews::view( 'notice', $notice ); ?>
			<?php } ?>
		<?php } ?>
		
		<?php if ( ! LatestNews::predefined_api_key() ) { ?>
			<form action="<?php echo esc_url( LatestNews_Admin::get_page_url() ); ?>" method="post">
				<?php wp_nonce_field( LatestNews_Admin::NONCE ) ?>
				<input type="hidden" name="action" value="enter-key">
				<div class="latestnews-form">
					<label for='host'>
						<span><b>Host Name:</b> https://</span>
						<input placeholder="newsapi.org/v2/top-headlines/" id="host" name="host" type="text" size="15" value="<?php echo ($latestnews->host) ?>" class="regular-text code">
					</label>
					<label for='key' title="Key">
						<span><b>Key:</b></span>
						<input id="key" name="key" type="text" size="15" value="<?php echo ($latestnews->apiKey) ?>" class="regular-text code">
					</label>
					<label for='country'>
						<span><b>Country Code:(IN|US|UK etc.)</b></span>
						<input placeholder="IN or US" id="country" name="country" type="text" size="15" value="<?php echo ($latestnews->country) ?>" class="regular-text code">
					</label>
				</div>
				<div class="latestnews-card-actions">					
					<?php wp_nonce_field(LatestNews_Admin::NONCE) ?>
					<div id="publishing-action">
						<input type="hidden" name="action" value="enter-key">
						<input type="submit" name="submit" id="submit" class="latestnews-button latestnews-could-be-primary" value="<?php esc_attr_e('Save Changes', 'latestnews');?>">
					</div>
					<div class="clear"></div>
				</div>
			</form>
		<?php } ?>
	</div>
</div>
